import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';

import { AddComponent } from './pages/add/add.component';
import { FindComponent } from './pages/find/find.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [
    AddComponent,
    FindComponent,
    HeroComponent,
    HomeComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ],
})
export class HeroesModule {}
