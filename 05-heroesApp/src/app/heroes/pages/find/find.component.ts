import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styles: [
  ]
})
export class FindComponent implements OnInit {

  termino:string = '';
  heroes:Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe( heroes => this.heroes = heroes);
  }

  opcionSeleccionada(heroe:Heroe){

    if (!heroe) {
      this.heroeSeleccionado = undefined;
      return;
    }

    this.termino = heroe.superhero
    this.heroeSeleccionado = heroe;
  }
}
