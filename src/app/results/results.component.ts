import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { filter, map, tap } from 'rxjs/operators';
import { Result } from '../models/all.models';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'results-table',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() raceResults$ : Observable<Result[]>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = ['Season', 'RaceName', 'Driver', 'Constructor','Position','Points'];
  public dataSource  = new MatTableDataSource<Result>();
  public dataSource2  = new MatTableDataSource<Observable<Result>>();
  public displayTable : boolean = false;

  constructor() { }
  ngOnChanges(){
    //only subscribe if raceresults has data in it already
    if(this.raceResults$ != null)
    {
      this.raceResults$.subscribe(data => this.dataSource.data = data)
    }
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {

  }
  ngOnDestroy(){
    this.raceResults$.subscribe().unsubscribe()
  }

}
