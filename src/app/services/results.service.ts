import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Race } from '../models/all.models'
interface RaceArr{
  Races : Race[];
}
interface MRData{
  RaceTable : RaceArr;
  limit: string,
  offset: string,
  series :string
  total :string
  url :string
  xmlns: string
}
interface response{
  MRData : MRData
}
@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  raceResults : Race[] = []
  constructor(private httpClient : HttpClient) { }

  public getResults(driver? : string, constructor? : string, year? :string){
    if(driver && constructor && year)
      return this.httpClient.get<response>('http://ergast.com/api/f1/' + year + '/drivers/' + driver +'/constructors/' + constructor +'/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else if(driver && constructor)
      return this.httpClient.get<response>('http://ergast.com/api/f1/drivers/' + driver +'/constructors/' + constructor +'/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else if(driver && year)
    return this.httpClient.get<response>('http://ergast.com/api/f1/' + year + '/drivers/' + driver + '/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else if(constructor && year)
      return this.httpClient.get<response>('http://ergast.com/api/f1/' + year +'/constructors/' + constructor +'/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else if(year)
      return this.httpClient.get<response>('http://ergast.com/api/f1/' + year +'/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else if(driver)
      return this.httpClient.get<response>('http://ergast.com/api/f1/drivers/' + driver + '/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else if (constructor)
      return this.httpClient.get<response>('http://ergast.com/api/f1/constructors/' + constructor +'/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
    else
      return this.httpClient.get<response>('http://ergast.com/api/f1/results.json?limit=5000').pipe(map(response => response.MRData.RaceTable.Races))
  }
}
