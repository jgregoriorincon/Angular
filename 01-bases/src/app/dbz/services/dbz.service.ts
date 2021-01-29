import { Injectable } from '@angular/core';

import { Personaje } from '../interfaces/dbz.interface';


@Injectable()
export class DbzService {

  private _personajes:Personaje[] = [
    {
      nombre: 'Krillin',
      poder: 700
    },
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 80000
    }
  ];

  public get personajes() : Personaje[] {
    return [...this._personajes]
  }

  constructor(){
    console.log('Servicio inicializado');
  }

  agregarPersonaje( personaje:Personaje) {
    this._personajes.push(personaje);
  }
}
