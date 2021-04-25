import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateRoutingModule } from './template-routing.module';
import { SwitchComponent } from './switch/switch.component';
import { BasicComponent } from './basic/basic.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [SwitchComponent, BasicComponent, DynamicComponent],
  imports: [CommonModule, FormsModule, TemplateRoutingModule],
})
export class TemplateModule {}
