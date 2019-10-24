import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../shared/poke-api.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  private subscription: Subscription;
  pokeApiData;
  filteredItems: Array<String>;
  todaysPokemon;
  constructor(private pokeApiService: PokeApiService, private router: Router) { }

  ngOnInit() {
    this.loadPokemonData();
  }

  /**
   * Load the pokemon list data
   * Load the pokemon for today
   * First check if these data exist in the localStorage. Make the API request only if it does not exist.
   */
  loadPokemonData() {
    let date = new Date(),
      todaysPokemonData = localStorage.getItem(date.toDateString()),
      pokeApiData = localStorage.getItem('pokeList');

    if (todaysPokemonData && pokeApiData) {
      this.pokeApiData = JSON.parse(pokeApiData);
      this.todaysPokemon = JSON.parse(todaysPokemonData);
      this.pokeApiService.setPokeApiData(this.pokeApiData);
      this.pokeApiService.setTodaysPokemon(this.todaysPokemon);

    } else if (pokeApiData && !todaysPokemonData) {
      this.pokeApiData = JSON.parse(pokeApiData);
      this.getRandomPokemonForToday();

    } else {
      this.getPokeData();
      this.getRandomPokemonForToday();
    }
  }

  /**
   * Submit the list of values entered in the search back and navigate to the search page
   * @param event event from the click on Search Button
   */
  submitSearch(event) {
    if (this.filteredItems) {
      this.pokeApiService.setSearchPokemonList(this.filteredItems);
      this.router.navigate(['/searchPage']);
    }
  }

  /**
   * Get the list of available pokemons and set it in local storage
   */
  getPokeData() {
    this.pokeApiService.fetchPokeData()
      .subscribe(
        (data) => {
          this.pokeApiData = data;
          localStorage.setItem('pokeList', JSON.stringify(data));
        },
        (err) => console.log(err)
      );
  }

  /**
   * Get the random pokemon for the day by generating a random number
   * Store this pokemon in localStorage for the current day
   */
  getRandomPokemonForToday() {
    let random = Math.floor(Math.random() * Math.floor(807))
    this.pokeApiService.fetchSinglePokemonData(random);
    this.subscription = this.pokeApiService.todaysPokemonUpdated.subscribe(
      (todaysPokemon) => {
        let date = new Date();
        localStorage.setItem(date.toDateString(), JSON.stringify(todaysPokemon));
      }
    );
  }

}
