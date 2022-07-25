import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { ConstructorService } from '../services/constructors.service';
import { ResultsService } from '../services/results.service';
import { SeasonsService } from '../services/seasons.service';
import { Driver, Constructor, Season, Race, Result } from '../models/all.models';
import { ResultsComponent } from '../results/results.component';
import { Observable, map, race } from 'rxjs';



@Component({
  selector: 'result-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(ResultsComponent, {static : false}) childComponent : ResultsComponent;
  public drivers$: Observable<Driver[]>;
  public constructors$: Observable<Constructor[]>
  public seasons$ : Observable<Season[]>

  public raceResults$ : Observable<Race[]>
  public allResults$ : Observable<Result[][]>
  public formattedResults$ : Observable<Result[]>
  //currently selected on the form
  public selectedDriver : string = '';
  public selectedConstructor: string = '';
  public selectedSeason: string = '';
  public showTable : boolean = false;

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
    //send our results to the service
    this.raceResults$ = this.resultsService.getResults(this.selectedDriver, this.selectedConstructor, this.selectedSeason);
    //take results and give us the results object, and within that results object we append the season and raceName
    this.allResults$ = this.raceResults$.pipe(map(response => response.map(raceResult => raceResult.Results.map(result => ({...result, raceName : raceResult.raceName, season: raceResult.season})))))
    //since those are spit out in arrays themselves, we flatten those and get one big array of results
    this.formattedResults$ = this.allResults$.pipe(map(result => result.flat(2)))
  }

  public updateInfo(){
    //filter all other boxes depending on what is currently selected
    if(this.selectedConstructor && this.selectedDriver && this.selectedSeason){
      this.drivers$ = this.driverService.getDriversByConstructorAndYear(this.selectedConstructor, this.selectedSeason);
      this.seasons$ = this.seasonService.getSeasonsByDriverAndConstructor(this.selectedDriver, this.selectedConstructor);
      this.constructors$ = this.constructorService.getConstructorByDriverAndYear(this.selectedDriver, this.selectedSeason);
    }
    else if (this.selectedConstructor &&  this.selectedSeason){
      this.drivers$ = this.driverService.getDriversByConstructorAndYear(this.selectedConstructor, this.selectedSeason);
      this.constructors$ = this.constructorService.getConstructorByYear(this.selectedSeason);
      this.seasons$ = this.seasonService.getSeasonsByConstructor(this.selectedConstructor)
    }
    else if(this.selectedDriver && this.selectedSeason){
      this.constructors$ = this.constructorService.getConstructorByDriverAndYear(this.selectedDriver, this.selectedSeason);
      this.drivers$ = this.driverService.getDriversByYear(this.selectedSeason);
      this.seasons$ = this.seasonService.getSeasonsByDriver(this.selectedDriver);
    }
    else if (this.selectedDriver && this.selectedConstructor){
      this.seasons$ = this.seasonService.getSeasonsByDriverAndConstructor(this.selectedDriver, this.selectedConstructor);
      this.drivers$ = this.driverService.getDriversByConstructor(this.selectedConstructor);
      this.constructors$ = this.constructorService.getConstructorByDriver(this.selectedDriver)
    }
    else if(this.selectedConstructor){
      this.drivers$ = this.driverService.getDriversByConstructor(this.selectedConstructor);
      this.seasons$ = this.seasonService.getSeasonsByConstructor(this.selectedConstructor);
      this.constructors$ = this.constructorService.getConstructors()
    }
    else if(this.selectedDriver){
      this.constructors$ = this.constructorService.getConstructorByDriver(this.selectedDriver);
      this.seasons$ = this.seasonService.getSeasonsByDriver(this.selectedDriver);
      this.drivers$ = this.driverService.getDrivers();
    }
    else if(this.selectedSeason){
      this.drivers$ = this.driverService.getDriversByYear(this.selectedSeason);
      this.constructors$ = this.constructorService.getConstructorByYear(this.selectedSeason);
      this.seasons$ = this.seasonService.getSeasons();
    }
    else{
      this.drivers$ = this.driverService.getDrivers();
      this.constructors$ = this.constructorService.getConstructors();
      this.seasons$ = this.seasonService.getSeasons();
    }

  }

}
