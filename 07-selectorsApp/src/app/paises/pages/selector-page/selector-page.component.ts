import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interfaces';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  selectorForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    this.selectorForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.selectorForm.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getPaisesByRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });

    // Cuando cambia el pais
    this.selectorForm
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.selectorForm.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap((code) => this.paisesService.getPaisByCode(code)),
        switchMap((pais) => this.paisesService.getBordersByCode(pais?.borders!))
      )
      .subscribe((paises) => {
        this.fronteras = paises;
        this.cargando = false;
      });
  }

  saveForm() {
    console.log(this.selectorForm.value);
  }
}
