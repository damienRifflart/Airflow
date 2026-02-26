from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = ["http://localhost:3000", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/metar/{icao}")
async def get_metar(icao: str):
    url = f"https://aviationweather.gov/api/data/metar?ids={icao}&format=json"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, timeout=10)
            response.raise_for_status()  # lève une exception si code != 200
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Erreur réseau: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=502, detail=f"Erreur HTTP: {e}")

    try:
        data = response.json()
    except ValueError:
        raise HTTPException(status_code=502, detail="Réponse JSON invalide")

    if not data:  # réponse vide
        raise HTTPException(status_code=404, detail=f"Aucun METAR trouvé pour {icao}")

    return data