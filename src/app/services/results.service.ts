import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Race } from '../models/all.models'
interface DriverArr{
  Races : Race[];
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
export class ResultsService {

  constructor(private httpClient : HttpClient) { }

  public searchResults(driver? : string, constructor? : string, year? :string){
    if(driver && constructor && year)
      return this.httpClient.get('http://ergast.com/api/f1/' + year + '/drivers/' + driver +'/constructors/' + constructor +'/results.json?limit=5000')
    else if(driver && constructor)
      return this.httpClient.get('http://ergast.com/api/f1/drivers/' + driver +'/constructors/' + constructor +'/results.json?limit=5000')
    else if(driver && year)
    return this.httpClient.get('http://ergast.com/api/f1/' + year + '/drivers/' + driver + '/results.json?limit=5000')
    else if(constructor && year)
      return this.httpClient.get('http://ergast.com/api/f1/' + year +'/constructors/' + constructor +'/results.json?limit=5000')
    else if(year)
      return this.httpClient.get('http://ergast.com/api/f1/' + year +'/results.json?limit=5000')
    else if(driver)
      return this.httpClient.get('http://ergast.com/api/f1/drivers/' + driver + '/results.json?limit=5000')
    else if (constructor)
      return this.httpClient.get('http://ergast.com/api/f1/constructors/' + constructor +'/results.json?limit=5000')
    else
      return this.httpClient.get('http://ergast.com/api/f1/results.json?limit=5000')
  }
}
