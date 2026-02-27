"use client"

import { Wind, Eye, Cloud, Thermometer, AlertTriangle, Clock } from 'lucide-react';
import type { Fcst } from "../../../types/taf";

interface ForecastWidgetProps {
  forecast: Fcst;
}

export function ForecastWidget({ forecast }: ForecastWidgetProps) {
  const cloudsStr = forecast.clouds
    ?.map(cloud => `${cloud.cover}${cloud.base ? ` at ${cloud.base}ft` : ""}`).join("\n")
  || "None";

  const windStr = forecast.wdir && forecast.wspd
    ? (forecast.wdir === "VRB"
        ? `Variable at ${forecast.wspd} kt${forecast.wgst ? `, gusts to ${forecast.wgst} kt` : ""}`
        : `${forecast.wdir}° at ${forecast.wspd} kt${forecast.wgst ? `, gusts to ${forecast.wgst} kt` : ""}`
      )
    : "None";

  const visibStr = forecast.visib ? `${forecast.visib} miles` : "Undefined";

  const icingTurbStr = forecast.icgTurb?.map(it => 
      `${it.var} intensity ${it.intensity} from ${it.minAlt}ft to ${it.maxAlt}ft`
    ).join(", ") || "None";

  const tempStr = forecast.temp?.map(t => 
      `${t.maxOrMin}: ${t.sfcTemp}°C at ${new Date(t.validTime * 1000).toUTCString()}`
    ).join(", ") || "None";

  return (
    <div className="bg-background flex flex-col gap-3 border border-border rounded-md p-5">
      <div className="flex flex-row gap-3 items-center">
        <Clock size={20} className="text-accent" />
        <p className="text-muted-foreground text-md">
          From <strong>{new Date(forecast.timeFrom * 1000).toUTCString()}</strong> 
          &nbsp; to <strong>{new Date(forecast.timeTo * 1000).toUTCString()}</strong> 
        </p>
      </div>

      <p className='text-lg'>
        {forecast.fcstChange ? ` ${forecast.fcstChange}` : ""}
        {forecast.probability ? ` - Prob: ${forecast.probability}%` : ""}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <div className="flex flex-row gap-3 items-center">
            <Wind size={20} className="text-muted-foreground" />
            <p className="text-muted-foreground text-md">Wind</p>
          </div>
          <h3 className="text-lg">{windStr}</h3>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-3 items-center">
            <Cloud size={20} className="text-muted-foreground" />
            <p className="text-muted-foreground text-md">Clouds</p>
          </div>
          <h3 className="text-lg whitespace-pre-line">{cloudsStr}</h3>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-3 items-center">
            <Eye size={20} className="text-muted-foreground" />
            <p className="text-muted-foreground text-md">Visibility</p>
          </div>
          <h3 className="text-lg">{visibStr}</h3>
        </div>

        {forecast.icgTurb && forecast.icgTurb.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center">
              <AlertTriangle size={20} className="text-muted-foreground" />
              <p className="text-muted-foreground text-md">Icing/Turb</p>
            </div>
            <h3 className="text-lg">{icingTurbStr}</h3>
          </div>
        )}

        {forecast.temp && forecast.temp.length > 0 && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center">
              <Thermometer size={20} className="text-muted-foreground" />
              <p className="text-muted-foreground text-md">Temp</p>
            </div>
            <h3 className="text-lg">{tempStr}</h3>
          </div>
        )}

        {forecast.wxString && (
          <div className="flex flex-col col-span-2">
            <div className="flex flex-row gap-3 items-center">
              <AlertTriangle size={20} className="text-muted-foreground" />
              <p className="text-muted-foreground text-md">Special Weather</p>
            </div>
            <h3 className="text-lg">{forecast.wxString}</h3>
          </div>
        )}

        {forecast.notDecoded && (
          <div className="flex flex-col col-span-2">
            <div className="flex flex-row gap-3 items-center">
              <AlertTriangle size={20} className="text-muted-foreground" />
              <p className="text-muted-foreground text-md">Raw / Not Decoded</p>
            </div>
            <h3 className="text-lg">{forecast.notDecoded}</h3>
          </div>
        )}
      </div>
    </div>
  );
}