import { Component, OnInit } from '@angular/core';
import { CircuitService } from '../services/circuit.service';

interface Circuit{
  Location : Object[]
  circuitId : number
  circuitName: string
  url: string
}
@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.css']
})

export class CircuitComponent implements OnInit {
  public circuits: Circuit[] = [];
  constructor(private circuitService : CircuitService) { }

  ngOnInit(): void {
    this.circuitService.getCircuits().subscribe(data => this.circuits = data)
  }
  public openWikiArticle(url :string){
    window.open(url);
  }
}
