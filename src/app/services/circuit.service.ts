import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Circuit } from '../models/all.models'
interface CircuitsArr{
  Circuits : Circuit[];
}
interface MRData{
  CircuitTable : CircuitsArr;
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
export class CircuitService {

  constructor(private httpClient : HttpClient) { }

  public getCircuits(){
    return this.httpClient.get<response>('http://ergast.com/api/f1/circuits.json?limit=76').pipe(
      map(response => response.MRData.CircuitTable.Circuits))
  }
}
