export interface Cloud {
  cover: string;
  base: number;
}

export interface Metar {
  icaoId: string;
  receiptTime: string;
  obsTime: number;
  reportTime: string;
  temp: number;
  dewp: number;
  wdir: number;
  wspd: number;
  wgst: number;
  visib: string;
  altim: number;
  slp: number;
  wxString: string;
  presTend: number;
  maxT: number;
  minT: number;
  maxT24: number;
  minT24: number;
  precip: number;
  pcp3hr: number;
  pcp6hr: number;
  pcp24hr: number;
  snow: number;
  vertVis: number;
  metarType: string;
  rawOb: string;
  lat: number;
  lon: number;
  elev: number;
  name: string;
  clouds: Cloud[];
  fltCat: string;
}