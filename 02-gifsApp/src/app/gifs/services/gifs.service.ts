import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../intefaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'QvraGuIbNHXqfQsd9H7sihM1MhTwqy4h';
  private serviceUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  // TODO: Cambiar Any por su tipo
  public resultados: Gif[] = [];

  public get historial() {
    return [...this._historial];
  }

  constructor(private http:HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historialGifsApp')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultadosGifsApp')!) || [];
  }

  buscarGifs(query:string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);

      localStorage.setItem('historialGifsApp', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('q', query)
          .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultadosGifsApp', JSON.stringify(this.resultados));
      })

  }
}
