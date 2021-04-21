import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img: {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('/edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  saveHero() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.editHeroes(this.heroe).subscribe((heroe) => {
        this.showSnack('Registro editado');
      });
    } else {
      this.heroesService.addHeroes(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/edit', heroe.id]);
        this.showSnack('Registro creado');
      });
    }
  }

  deleteHero() {
    if (this.heroe.id) {
      const dialog = this.dialog.open(ConfirmComponent, {
        width: '250px',
        data: { ...this.heroe },
      });

      dialog.afterClosed().subscribe((result) => {
        if (result) {
          this.heroesService.deleteHeroe(this.heroe.id!).subscribe((resp) => {
            this.router.navigate(['/heroes']);
            this.showSnack('Registro eliminado');
          });
        }
      });
    }
  }

  showSnack(mensaje: string): void {
    this.snackbar.open(mensaje, 'ok', {
      duration: 2500,
    });
  }
}
