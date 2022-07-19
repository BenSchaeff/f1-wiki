import { Component, OnInit } from '@angular/core';
import { ConstructorService } from '../services/constructors.service';
interface Constructor{
  constructorId: string,
  name: string,
  nationality: string,
  url: string,
}
@Component({
  selector: 'app-constructors',
  templateUrl: './constructors.component.html',
  styleUrls: ['./constructors.component.css']
})
export class ConstructorsComponent implements OnInit {

  public constructors: Constructor[] = [];
  constructor(private constructorService : ConstructorService) { }

  ngOnInit(): void {
    this.constructorService.getConstructors().subscribe(data => this.constructors = data)
    this.constructorService.getConstructors().subscribe(data => console.log(data));
  }
  public openWikiArticle(url :string){
    window.open(url);
  }


}
