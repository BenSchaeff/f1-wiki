import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { ConstructorService } from '../services/constructors.service';
import { ResultsService } from '../services/results.service';
import { SeasonsService } from '../services/seasons.service';
import { Driver, Constructor, Season, Race } from '../models/all.models';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'result-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public drivers: Driver[] = [];
  public searchResults: Race[] = [];
  public constructors: Constructor[] = [];
  public seasons : Season[] = [];

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
    this.driverService.getDrivers().subscribe(data => this.drivers = data);
    this.constructorService.getConstructors().subscribe(data => this.constructors = data);
    this.seasonService.getSeasons().subscribe(data => this.seasons = data);


  }
  public getResults(){
    this.resultsService.getResults(this.selectedDriver, this.selectedConstructor, this.selectedSeason).subscribe(data => console.log(data));
    //send our results to the service
    this.resultsService.getResults(this.selectedDriver, this.selectedConstructor, this.selectedSeason).subscribe(data => this.searchResults = data);
    if(this.selectedDriver)
      this.isMissingDriver = false
  }

  public updateInfo(){
    //filter all other boxes depending on what is currently selected
    if (this.selectedConstructor &&  this.selectedSeason){
      this.driverService.getDriversByConstructorAndYear(this.selectedConstructor, this.selectedSeason).subscribe(data => this.drivers = data)
    }
    else if(this.selectedDriver && this.selectedSeason){
      this.constructorService.getConstructorByDriverAndYear(this.selectedDriver, this.selectedSeason).subscribe(data => this.constructors = data)
    }
    else if (this.selectedDriver && this.selectedConstructor){
      this.seasonService.getSeasonsByDriverAndConstructor(this.selectedDriver, this.selectedConstructor).subscribe(data => this.seasons = data)
    }
    else if(this.selectedConstructor){
      this.driverService.getDriversByConstructor(this.selectedConstructor).subscribe(data => this.drivers = data)
      this.seasonService.getSeasonsByConstructor(this.selectedConstructor).subscribe(data => this.seasons = data)
    }
    else if(this.selectedDriver){
      this.constructorService.getConstructorByDriver(this.selectedDriver).subscribe(data => this.constructors = data)
      this.seasonService.getSeasonsByDriver(this.selectedDriver).subscribe(data => this.seasons = data)
    }
    else if(this.selectedSeason){
      this.driverService.getDriversByYear(this.selectedSeason).subscribe(data => this.drivers = data);
      this.constructorService.getConstructorByYear(this.selectedSeason).subscribe(data => this.constructors = data);
    }
  }

}
