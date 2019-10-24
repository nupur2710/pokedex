import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private pokeApiData: Object;
  private todaysPokemon: Object;
  public todaysPokemonUpdated = new Subject<Object>();
  public searchPokemonList: Array<String> = [];
  constructor(private http: Http) { }

  /**
   * Fetch the list of available pokemons
   */
  fetchPokeData() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964").
      map((response: Response) => {
        this.pokeApiData = response.json()['results'];
        return this.pokeApiData;
      });
  }

  /**
   * Fetch the detailed data for the pokemon
   * @param {String} index name of the pokemon 
   */
  fetchPokemonData(index: String) {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + index);
  }

  /**
   * Fetch the detailed species data for the pokemon
   * @param {String} index name of the pokemon 
   */
  fetchPokemonSpeciesData(index: String) {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + index);
  }

  /**
   * Fetch the detailed data for the pokemon
   * @param {Number} index id of the pokemon 
   */
  fetchSinglePokemonData(index: Number) {
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

  /**
   * Set the pokemon for the day
   * @param {Object} data details of the pokemon for today
   */
  setTodaysPokemon(data: Object) {
    this.todaysPokemonUpdated.next(data);
  }

  /**
   * Set the list of pokemons
   * @param {Object} data list of the available pokemons
   */
  setPokeApiData(data: Object) {
    this.pokeApiData = data;
  }

  /**
   * Get the list of pokemons
   */
  getPokeApiData() {
    return this.pokeApiData;
  }

  /**
   * Set the list of searched pokemons in local storage
   * @param {Array<String>} data list of pokemons entered in search bar
   */
  setSearchPokemonList(data: Array<String>) {
    this.searchPokemonList = data;
    localStorage.setItem('searchPokemonList', JSON.stringify(data));
  }

  /**
   * Get the list of searched pokemons from local storage
   */
  getSearchPokemonList() {
    if (this.searchPokemonList.length == 0 && localStorage.getItem('searchPokemonList')) {
      this.searchPokemonList = JSON.parse(localStorage.getItem('searchPokemonList'));
    }
    return this.searchPokemonList;
  }

}
