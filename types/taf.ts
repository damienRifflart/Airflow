export interface IcingTurbulence {
  var: string;
  intensity: number;
  minAlt: number;
  maxAlt: number;
}

export interface TempForecast {
  validTime: number;
  sfcTemp: number;
  maxOrMin: "MAX" | "MIN";
}

export interface Fcst {
  timeFrom: number;
  timeTo: number;
  timeBec: number;
  fcstChange: string;
  probability: number;
  wdir: string;
  wspd: number;
  wgst: number;
  wshearHgt?: number;
  wshearDir?: number;
  wshearSpd?: number;
  visib: string;
  altim: number;
  vertVis?: number;
  wxString: string;
  notDecoded?: string;
  clouds: Cloud[];
  icgTurb?: IcingTurbulence[];
  temp?: TempForecast[];
}

export interface Cloud {
  cover: string;
  base: number;
}

export interface Taf {
  icaoId: string;
  dbPopTime: string;
  bulletinTime: string;
  issueTime: string;
  validTimeFrom: number;
  validTimeTo: number;
  rawTAF: string;
  mostRecent: number;
  remarks?: string;
  lat: number;
  lon: number;
  elev: number;
  prior?: number;
  name: string;
  fcsts: Fcst[];
}