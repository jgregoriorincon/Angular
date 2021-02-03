import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../intefaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'QvraGuIbNHXqfQsd9H7sihM1MhTwqy4h';
  private _historial: string[] = [];

  // TODO: Cambiar Any por su tipo
  public resultados: Gif[] = [];

  public get historial() {
    return [...this._historial];
  }

  constructor(private http:HttpClient) { }

  buscarGifs(query:string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10&offset=0&rating=g&lang=en`)
      .subscribe((response) => {
        console.log(response.data);
        this.resultados = response.data;
      })

  }

}
