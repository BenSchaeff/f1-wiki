import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';

interface Driver{
  dateOfBirth: string,
  driverId: string,
  familyName: string,
  givenName: string,
  nationality: string,
  url: string,
}
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  public drivers: Driver[] = [];
  constructor(private driverService : DriverService) { }

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(data => this.drivers = data);
    this.driverService.getDrivers().subscribe(data => console.log(data));
  }
  public openWikiArticle(url :string){
    window.open(url);
  }

}
