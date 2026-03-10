import type { Units } from "../../../types/units";

export const convertTemperature = (value: number, from: Units["temperature"], to: Units["temperature"]) => {
    if (from === to) return `${Math.round(value*10)/10} ${to}`;
    let valueInF;
    let converted;
    if (from === "°C") valueInF = value*9/5 + 32;
    if (from ==="F") valueInF = value;

    if (to ==="°C" && valueInF) converted = (valueInF - 32)*5/9;
    if (to === "F" && valueInF) converted = valueInF;

    if (converted) return `${Math.round(converted*10)/10} ${to}`;
}

export const convertSpeed = (value: number, from: Units["speed"], to: Units["speed"]) => {
    if (from === to) return `${Math.round(value*10)/10} ${to}`;
    let valueInMs;
    let converted;
    if (from === "Kt") valueInMs = value*0.514444;
    if (from ==="km/h") valueInMs = value / 3.6;
    if (from ==="m/s") valueInMs = value;

    if (to ==="Kt" && valueInMs) converted = valueInMs / 0.514444;
    if (to === "km/h" && valueInMs) converted = valueInMs*3.6;
    if (to === "m/s") converted = valueInMs;

    if (converted) return `${Math.round(converted*10)/10} ${to}`;
}

export const convertDistance = (value: number | string, from: Units["distance"], to: Units["distance"]) => {
    if (from === to) return `${Math.round(Number(value)*10)/10} ${to}`;
    let valueInM;
    let converted;
    if (from === "ft") valueInM = Number(value) / 3.281;
    if (from ==="mi") valueInM = Number(value)*1852;
    if (from ==="m") valueInM = Number(value);

    if (to ==="ft" && valueInM) converted = valueInM * 3.281;
    if (to === "mi" && valueInM) converted = valueInM/1852;
    if (to === "m") converted = valueInM;

    if (converted) return `${Math.round(converted*10)/10} ${to}`;
}