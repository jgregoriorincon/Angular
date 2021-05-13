import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width: 400px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 12;
  lng!: number;
  lat!: number;

  constructor() {}

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.1220891, 4.7164835],
      zoom: this.zoomLevel,
    });

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map.getZoom();
    });
    this.map.on('zoomend', (ev) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
      if (this.map.getZoom() < 5) {
        this.map.zoomTo(5);
      }
    });

    this.map.on('move', (ev) => {
      console.log(ev);
      const center = this.map.getCenter();
      this.lat = center.lat;
      this.lng = center.lng;
    });
  }

  zoomOut() {
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }
  zoomIn() {
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }
  zoomChange(value: string) {
    this.map.zoomTo(Number(value));
  }
}
