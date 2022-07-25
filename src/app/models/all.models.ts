export interface Driver{
  dateOfBirth: string,
  driverId: string,
  familyName: string,
  givenName: string,
  nationality: string,
  url: string,
}

export interface Constructor{
  constructorId: string,
  name: string,
  nationality: string,
  url: string,
}
export interface Race{
  Results : Result[]
  Circuit : Circuit
  date :string
  raceName : string
  round : string
  season: string
}
export interface Result{
  Constructor : Constructor
  Driver : Driver
  Time: Time
  grid: string
  laps : string
  number : string
  points : string
  position : string;
  raceName?: string;
  season?: string;
}
export interface Time{
  millis: string
  time : string
}
export interface Circuit{
  Location : Object[]
  circuitId : number
  circuitName: string
  url: string
}
export interface Season{
  season: string
  url :string
}
