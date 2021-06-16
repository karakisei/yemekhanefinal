import { YemeklisteleComponent } from './components/yemeklistele/yemeklistele.component';
import { OgunlisteleComponent } from './components/ogunlistele/ogunlistele.component';
import { OgunComponent } from './components/ogun/ogun.component';
import { YemekComponent } from './components/yemek/yemek.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },

  {
    path:'yemek',
    component:YemekComponent
  },

  {
    path:'ogun',
    component:OgunComponent
  },

  {
    path:'ogunlistele/:yemekId',
    component:OgunlisteleComponent
  },

  {
    path:'yemeklistele/:ogunId',
    component:YemeklisteleComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
