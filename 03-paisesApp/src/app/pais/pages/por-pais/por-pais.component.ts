import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino: string = ''
  existeError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    if (termino) {
      this.existeError = false;
      this.termino = termino;

      this.paisService.buscarPais(this.termino)
          .subscribe( paises => {
            this.paises = paises;
          }, (err) => {
            console.info(err);
            this.existeError = true;
            this.paises = [];
          });
    }
  }

  sugerencias( termino:string ){
    this.existeError = false;
    // TODO: Crear sugerencias
  }
}
