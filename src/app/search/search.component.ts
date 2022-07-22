import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { ConstructorService } from '../services/constructors.service';
import { ResultsService } from '../services/results.service';
import { SeasonsService } from '../services/seasons.service';
import { Driver, Constructor, Season, Race, Result } from '../models/all.models';
import { ResultsComponent } from '../results/results.component';
import { Observable, map } from 'rxjs';
import { pipe } from 'rxjs';


@Component({
  selector: 'result-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public drivers$: Observable<Driver[]>;
  public constructors$: Observable<Constructor[]>
  public seasons$ : Observable<Season[]>

  public raceResults$ : Observable<Race[]>


  //currently selected on the form
  public selectedDriver : string = '';
  public selectedConstructor: string = '';
  public selectedSeason: string = '';
  public isMissingDriver : boolean = true;

  constructor(private driverService : DriverService,
              private constructorService : ConstructorService,
              private resultsService : ResultsService,
              private seasonService : SeasonsService) { }

  ngOnInit(): void {
    //grab everything by default
    this.drivers$ = this.driverService.getDrivers();
    this.constructors$ = this.constructorService.getConstructors();
    this.seasons$ = this.seasonService.getSeasons();
  }
  public getResults(){
    //log results for debugging
    this.resultsService.getResults(this.selectedDriver, this.selectedConstructor, this.selectedSeason).subscribe(data => console.log(data));
    //send our results to the service
    this.raceResults$ = this.resultsService.getResults(this.selectedDriver, this.selectedConstructor, this.selectedSeason);

    if(this.selectedDriver)
      this.isMissingDriver = false

  }

  public updateInfo(){
    //filter all other boxes depending on what is currently selected
    if (this.selectedConstructor &&  this.selectedSeason){
      this.drivers$ = this.driverService.getDriversByConstructorAndYear(this.selectedConstructor, this.selectedSeason);
    }
    else if(this.selectedDriver && this.selectedSeason){
      this.constructors$ = this.constructorService.getConstructorByDriverAndYear(this.selectedDriver, this.selectedSeason);
    }
    else if (this.selectedDriver && this.selectedConstructor){
      this.seasons$ = this.seasonService.getSeasonsByDriverAndConstructor(this.selectedDriver, this.selectedConstructor);
    }
    else if(this.selectedConstructor){
      this.drivers$ = this.driverService.getDriversByConstructor(this.selectedConstructor);
      this.seasons$ = this.seasonService.getSeasonsByConstructor(this.selectedConstructor);
    }
    else if(this.selectedDriver){
      this.constructors$ = this.constructorService.getConstructorByDriver(this.selectedDriver);
      this.seasons$ = this.seasonService.getSeasonsByDriver(this.selectedDriver);
    }
    else if(this.selectedSeason){
      this.drivers$ = this.driverService.getDriversByYear(this.selectedSeason);
      this.constructors$ = this.constructorService.getConstructorByYear(this.selectedSeason);
    }
    else{
      this.drivers$ = this.driverService.getDrivers();
      this.constructors$ = this.constructorService.getConstructors();
      this.seasons$ = this.seasonService.getSeasons();
    }

  }

}
