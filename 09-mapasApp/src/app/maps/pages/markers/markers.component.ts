import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface markerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}
@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarkersComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-74.1220891, 4.7164835];

  markers: markerColor[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.map.on('move', (ev) => {
      const center = this.map.getCenter();
      this.center = [center.lng, center.lat];
    });

    this.readLocaStore();

    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = 'Hola Mundo';
    // new mapboxgl.Marker({
    //   element: markerHTML,
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.map);
  }

  addMarker() {
    const color = '#XXXXXX'.replace(/X/g, (y) => ((Math.random() * 16) | 0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: color,
    })
      .setLngLat(this.center)
      .addTo(this.map);

    this.markers.push({ marker: newMarker, color });

    this.saveLocalStorage();
  }

  deleteMarker(idx: number) {
    this.markers[idx].marker?.remove();
    this.markers.splice(idx, 1);
    this.saveLocalStorage();
  }

  gotoMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({ center: marker.getLngLat() });
  }

  saveLocalStorage() {
    const markersArray: markerColor[] = [];

    this.markers.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      markersArray.push({
        color: color,
        center: [lng, lat],
      });
    });

    localStorage.setItem('markersMap', JSON.stringify(markersArray));
  }

  readLocaStore() {
    if (!localStorage.getItem('markersMap')) {
      return;
    }

    const markersArray: markerColor[] = JSON.parse(localStorage.getItem('markersMap')!);

    markersArray.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.center!)
        .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color,
      });

      newMarker.on('dragend', () => {
        this.saveLocalStorage();
      });
    });
  }
}
