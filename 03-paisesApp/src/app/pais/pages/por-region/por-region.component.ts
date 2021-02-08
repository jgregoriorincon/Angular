import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent{

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva:string = '';
  existeError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService:PaisService) { }

  activarRegion(region:string){
    if (region == this.regionActiva) {
      return;
    }

    this.regionActiva = region;
    this.paises = [];

    if (this.regionActiva) {
      this.existeError = false;

      this.paisService.buscarRegion(this.regionActiva)
          .subscribe( paises => {
            this.paises = paises;
          }, (err) => {
            console.info(err);
            this.existeError = true;
            this.paises = [];
          });
    }
  }

  getClassCSS(region:string){
    return (region === this.regionActiva) ? 'btn btn-primary me-1' : 'btn btn-outline-primary me-1';
  }
}
