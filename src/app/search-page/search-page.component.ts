import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../shared/poke-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  private variablelist: Array<String>;
  private pokeApiData;
  private searchPokemonApi;
  private searchedPokemons: Array<Object> = [];

  constructor(private pokeApiService: PokeApiService) {
    this.variablelist = this.pokeApiService.getSearchPokemonList();
    this.pokeApiData = this.pokeApiService.getPokeApiData();
  }

  ngOnInit() {
    this.fetchDataForSearchedPokemons();
  }

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
          console.log(response);
        })
        .subscribe((data) => console.log(data));
    }
  }
  

}
