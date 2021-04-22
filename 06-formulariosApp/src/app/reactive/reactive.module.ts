import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';

import { BasicComponent } from './basic/basic.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  declarations: [BasicComponent, DynamicComponent, SwitchComponent],
  imports: [CommonModule, ReactiveRoutingModule],
})
export class ReactiveModule {}
