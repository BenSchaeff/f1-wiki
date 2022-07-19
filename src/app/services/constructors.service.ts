import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Constructor } from '../models/all.models'
interface ConstructorArr{
  Constructors : Constructor[];
}
interface MRData{
  ConstructorTable : ConstructorArr
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
export class ConstructorService {

  constructor(private httpClient : HttpClient) { }

  public getConstructors(){
    return this.httpClient.get<response>('http://ergast.com/api/f1/constructors.json?limit=211').pipe(
      map(response => response.MRData.ConstructorTable.Constructors))
  }
  public getConstructorByYear(year : string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/' + year +'/constructors.json?limit=211').pipe(
      map(response => response.MRData.ConstructorTable.Constructors))
  }
  public getConstructorByDriver(driverId : string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/drivers/' + driverId +'/constructors.json?limit=211').pipe(
      map(response => response.MRData.ConstructorTable.Constructors))
  }
  public getConstructorByDriverAndYear(driverId : string, year: string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/' + year + '/drivers/' + driverId +'/constructors.json?limit=211').pipe(
      map(response => response.MRData.ConstructorTable.Constructors))
  }
}
