import type { Metar } from "./metar";

export type TempDataPoint = {
    reportTime: Date;
    temperature: Metar["temp"];
    dewpoint: Metar["dewp"];
};

export type WindDataPoint = {
    reportTime: Date;
    windspeed: Metar["wspd"];
    gusts: Metar["wgst"];
};

export type PressureDataPoint = {
    reportTime: Date;
    pressure: Metar["altim"];
};

export type VisibilityDataPoint = {
    reportTime: Date;
    visibility: Metar["visib"];   
}