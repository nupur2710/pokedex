import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  pokeApiData;
  private todaysPokemon;
  public todaysPokemonUpdated = new Subject<Object>();
  public searchPokemonList: Array<String>;
  constructor(private http: Http) { }

  fetchPokeData() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964").
      map((response: Response) => {
        this.pokeApiData = response.json()['results'];
        return this.pokeApiData;
      });
  }

  fetchPokemonData(index){
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + index);
  }

  fetchSinglePokemonData(index) {
    this.http.get('https://pokeapi.co/api/v2/pokemon/' + index)
      .subscribe(
        (data) => {
          this.todaysPokemon = data.json();
          console.log(this.todaysPokemon);
          this.setTodaysPokemon(this.todaysPokemon);
        },
        (err) => console.log(err)
      );
  }

  setTodaysPokemon(data) {
    this.todaysPokemonUpdated.next(data);
  }

  setPokeApiData(data){
    this.pokeApiData = data;
  }

  getPokeApiData(){
    return this.pokeApiData;
  }

  setSearchPokemonList(data) {
    this.searchPokemonList = data;
  }

  getSearchPokemonList() {
    return this.searchPokemonList;
  }

}
