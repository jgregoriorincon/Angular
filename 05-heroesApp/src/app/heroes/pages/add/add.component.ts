import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(private heroesService:HeroesService) {}

  ngOnInit(): void {}

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }
    this.heroesService.addHeroes(this.heroe).subscribe(resp => console.log(resp))
  }
}
