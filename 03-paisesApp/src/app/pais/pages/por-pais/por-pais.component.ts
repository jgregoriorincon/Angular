import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = ''
  existeError: boolean = false;

  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean = false;

  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    if (termino) {
      this.existeError = false;
      this.termino = termino;
      this.mostrarSugerencias = false;

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
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
        .subscribe((paises) => {
          this.paisesSugeridos = paises.splice(0,5);
        }, (err) => {
          this.paisesSugeridos = [];
        })
  }
}
