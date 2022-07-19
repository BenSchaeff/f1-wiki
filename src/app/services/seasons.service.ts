import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Season } from '../models/all.models'
import { map } from 'rxjs/operators'
interface SeasonArr{
  Seasons : Season[];
}
interface MRData{
  SeasonTable : SeasonArr
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
export class SeasonsService {

  constructor(private httpClient : HttpClient) { }

  public getSeasons(){
    return this.httpClient.get<response>('http://ergast.com/api/f1/seasons.json?limit=1000').pipe(
      map(response => response.MRData.SeasonTable.Seasons))
  }
  public getSeasonsByDriver(driverId : string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/drivers/' + driverId + '/seasons.json?limit=1000').pipe(
      map(response => response.MRData.SeasonTable.Seasons))
  }
  public getSeasonsByConstructor(constructorId : string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/constructors/' + constructorId + '/seasons.json?limit=1000').pipe(
      map(response => response.MRData.SeasonTable.Seasons))
  }
  public getSeasonsByDriverAndConstructor(driverId : string, constructorId : string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/drivers/' + driverId +'/constructors/' + constructorId + '/seasons.json?limit=1000').pipe(
      map(response => response.MRData.SeasonTable.Seasons))
  }
}
