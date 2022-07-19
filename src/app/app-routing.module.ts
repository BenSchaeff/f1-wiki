import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CircuitComponent } from './circuit/circuit.component';
import { DriversComponent } from './drivers/drivers.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'circuits', component:CircuitComponent},
  { path: 'drivers', component:DriversComponent},
  { path: 'constructors', component:ConstructorsComponent},
  { path: 'search', component:SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
