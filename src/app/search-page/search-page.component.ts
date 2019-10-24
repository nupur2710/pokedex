import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../shared/poke-api.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  private variablelist: Array<String> = [];
  private pokeApiData: Object;
  private searchPokemonApi: Array<any>;
  private searchedPokemons: Array<Object> = [];

  constructor(private pokeApiService: PokeApiService) {
    this.variablelist = this.pokeApiService.getSearchPokemonList();
    this.pokeApiData = this.pokeApiService.getPokeApiData();
  }

  ngOnInit() {
    this.fetchDataForSearchedPokemons();
  }

  /**
   * Fetch the detailed data for all the pokemons entered in the search bar by joining all requests
   */
  fetchDataForSearchedPokemons() {
    this.searchPokemonApi = [];
    if (this.variablelist && this.variablelist.length > 0) {
      for (let i = 0; i < this.variablelist.length; i++) {
        this.searchPokemonApi.push(this.pokeApiService.fetchPokemonData(this.variablelist[i]));
      }
      forkJoin(this.searchPokemonApi)
        .map(response => {
          for (let i = 0; i < response.length; i++) {
            var res = JSON.parse(response[i]['_body']);
            this.searchedPokemons.push(res);
          }
        })
        .subscribe((data) => console.log(data),
          (err) => console.log(err));
    }
  }
}
