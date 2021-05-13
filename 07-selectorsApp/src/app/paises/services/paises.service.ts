import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';

import { PaisSmall, Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _baseUrl = 'https://restcountries.eu/rest/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europa', 'Oceania'];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  getPaisesByRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisByCode(code: string): Observable<Pais | null> {
    if (!code) {
      return of(null);
    }
    const url = `${this._baseUrl}/alpha/${code}`;
    return this.http.get<Pais>(url);
  }

  getPaisByCodeSmall(code: string): Observable<PaisSmall> {
    const url = `${this._baseUrl}/alpha/${code}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>(url);
  }

  getBordersByCode(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach((code) => {
      const peticion = this.getPaisByCodeSmall(code);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
