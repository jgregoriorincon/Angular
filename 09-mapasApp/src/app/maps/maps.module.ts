import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';

import { MapSmallComponent } from './components/map-small/map-small.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { PropertyComponent } from './pages/property/property.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

@NgModule({
  declarations: [
    MapSmallComponent,
    FullScreenComponent,
    MarkersComponent,
    PropertyComponent,
    ZoomRangeComponent,
  ],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
