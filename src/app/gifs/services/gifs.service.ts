import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'M3d9w34t71Chaqk8WdHjeyOGGXscT3ro'
  private _historial: string[] = [];

  // TODO: cambiar el tipo 
  public resultados: Gif[] = [];


  get historial() {

    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase()

    if (!this._historial.includes(query)) {

      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );

    }

    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=M3d9w34t71Chaqk8WdHjeyOGGXscT3ro&q=${query}&limit=10`)
      .subscribe( ( resp ) => {
          console.log( resp.data );

        this.resultados = resp.data;
          
      });







  }

}
