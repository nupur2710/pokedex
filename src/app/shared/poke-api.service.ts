import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  pokeApiData;
  constructor(private http: Http) { }

  fetchPokeData() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964").
      map((response: Response) => {
        this.pokeApiData = response.json()['results'];
        return this.pokeApiData;
      });
  }


  getPokeApiData() {
  }

}
