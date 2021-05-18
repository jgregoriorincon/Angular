import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { BarComponent } from './pages/bar/bar.component';
import { DoubleChartComponent } from './pages/double-chart/double-chart.component';
import { DonutComponent } from './pages/donut/donut.component';
import { DonutHttpComponent } from './pages/donut-http/donut-http.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { ChartsComponent } from './services/charts/charts.component';


@NgModule({
  declarations: [BarComponent, DoubleChartComponent, DonutComponent, DonutHttpComponent, ChartBarComponent, ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
