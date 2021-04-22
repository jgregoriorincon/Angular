import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicComponent } from './basic/basic.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SwitchComponent } from './switch/switch.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        component: BasicComponent,
      },
      {
        path: 'dynamic',
        component: DynamicComponent,
      },
      {
        path: 'switch',
        component: SwitchComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TemplateRoutingModule {}
