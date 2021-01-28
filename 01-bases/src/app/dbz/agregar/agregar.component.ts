import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent {

  @Input() nuevo:Personaje = {
    nombre: '',
    poder: 0
  }
  @Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();

  agregar(){

    this.nuevo.nombre = this.nuevo.nombre.trim();

    if ( this.nuevo.nombre.length === 0 ){
      return;
    }
    if ( this.nuevo.poder < 0 ){
      return;
    }

    this.onNuevoPersonaje.emit( this.nuevo );
    this.cleanNuevo();
  }

  cleanNuevo() {
    this.nuevo = {
      nombre: '',
      poder: 0
    }
  }
}
