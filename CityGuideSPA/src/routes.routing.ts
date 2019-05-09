import { CityAddComponent } from './app/city/city-add/city-add.component';
import { CityDetailComponent } from './app/city/city-detail/city-detail.component';
import { CityComponent } from './app/city/city.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './app/register/register.component';
import { PhotoComponent } from './app/photo/photo.component';

export const appRoutes: Routes = [
  {path: 'city', component: CityComponent },
  {path: 'cityDetail/:cityId', component: CityDetailComponent},
  {path: 'cityadd', component: CityAddComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'city', pathMatch: 'full'}
];
