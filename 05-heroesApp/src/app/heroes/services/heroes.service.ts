import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private heroesURL: string = environment.apiBaseURL + '/heroes';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.heroesURL}`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.heroesURL}/${id}`);
  }

  getSugerencias(query: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.heroesURL}/?q=${query}&_limit=6`);
  }

  addHeroes(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.heroesURL}`, heroe);
  }

  editHeroes(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.heroesURL}/${heroe.id}`, heroe);
  }

  deleteHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.heroesURL}/${id}`);
  }
}
