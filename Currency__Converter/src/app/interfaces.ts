export interface ApiRate {
  "currencyCodeA": number,
  "currencyCodeB": number,
  "date": number,
  "rateBuy"?: number,
  "rateSell"?: number,
  "rateCross"?: number
}

export interface Country {
  name: string,
  currencyCode: number,
}
