import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ResultsService } from '../services/results.service';
import { map } from 'rxjs/operators';
import { Race, Result } from '../models/all.models';
@Component({
  selector: 'results-table',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() raceResults : Race[] = [];
  @Input() missingDriver : boolean = false;
  public displayedColumns: string[] = ['Season', 'RaceName', 'Driver','Position','Points'];

  constructor(private resultsService : ResultsService) { }

  ngOnInit(): void {
  }


}
