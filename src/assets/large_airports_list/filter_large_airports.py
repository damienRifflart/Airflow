import csv
import json
import asyncio
import httpx

input_file = 'airports_Feb25_2026.csv'
output_file = 'large_airports.json'

airports = []
with open(input_file, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['type'] == 'large_airport' and row['icao_code']:
            airports.append({
                "icao": row['icao_code'],
                "name": row['name'],
                "city": row['municipality']
            })

print(f"{len(airports)} large airports found in CSV file.")

SEM_LIMIT = 10  # concurrent requests
semaphore = asyncio.Semaphore(SEM_LIMIT)

async def check_metar(airport, client):
    url = f"https://aviationweather.gov/api/data/metar?ids={airport['icao']}&format=json"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json"
    }
    async with semaphore:
        try:
            resp = await client.get(url, headers=headers, timeout=10)
            resp.raise_for_status()
            data = resp.json()
            if data:
                return airport
        except Exception:
            return None

async def filter_valid_airports(airports):
    valid_airports = []
    async with httpx.AsyncClient() as client:
        tasks = [check_metar(a, client) for a in airports]
        results = await asyncio.gather(*tasks)
        valid_airports = [r for r in results if r]
    return valid_airports

valid_airports = asyncio.run(filter_valid_airports(airports))

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(valid_airports, f, indent=2, ensure_ascii=False)

print(f"{len(valid_airports)} large airports with valid Metars saved in {output_file}.")