import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Driver } from '../models/all.models'
interface DriverArr{
  Drivers : Driver[];
}
interface MRData{
  DriverTable : DriverArr;
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
export class DriverService {

  constructor(private httpClient : HttpClient) { }

  public getDrivers(){
    return this.httpClient.get<response>('http://ergast.com/api/f1/drivers.json?limit=854').pipe(map(response => response.MRData.DriverTable.Drivers))
  }
  public getDriversByYear(year:string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/'+ year + '/drivers.json?limit=500').pipe(map(response => response.MRData.DriverTable.Drivers))
  }
  public getDriversByConstructor(constructor:string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/constructors/' + constructor +'/drivers.json?limit=500').pipe(map(response => response.MRData.DriverTable.Drivers))
  }
  public getDriversByConstructorAndYear(constructor : string, year:string){
    return this.httpClient.get<response>('http://ergast.com/api/f1/'+ year + '/constructors/' + constructor +'/drivers.json?limit=500').pipe(map(response => response.MRData.DriverTable.Drivers))
  }
}
