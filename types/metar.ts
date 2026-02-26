export interface Cloud {
  cover: string;
  base: number;
}

export interface Metar {
  icaoId: string;
  receiptTime: Date;
  obsTime: number;
  reportTime: Date;
  temp: number;
  dewp: number;
  wdir: number;
  wspd: number;
  wgst: number;
  visib: number;
  altim: number;
  slp: number | null;
  wxString: string | null;
  presTend: number | null;
  maxT: number | null;
  minT: number | null;
  maxT24: number | null;
  minT24: number | null;
  precip: number | null;
  pcp3hr: number | null;
  pcp6hr: number | null;
  pcp24hr: number | null;
  snow: number | null;
  vertVis: number | null;
  metarType: string;
  rawOb: string;
  lat: number;
  lon: number;
  elev: number;
  name: string;
  clouds: Cloud[];
  fltCat: string;
}