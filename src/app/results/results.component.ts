import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { filter, map, tap } from 'rxjs/operators';
import { Result } from '../models/all.models';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'results-table',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() raceResults$ : Observable<Result[]>
  public displayedColumns: string[] = ['Season', 'RaceName', 'Driver','Position','Points'];

  constructor() { }

  ngOnInit(): void {

  }


}
