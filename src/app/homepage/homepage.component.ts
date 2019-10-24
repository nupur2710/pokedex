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

  searchPokemon(event) {
    var searchString = event.target.value;
    this.filteredItems = this.pokeApiData.filter(item => {
      return item['name'].indexOf(searchString) > -1;
    });

  }

  submitSearch(event) {
    console.log(this.filteredItems);
    this.pokeApiService.setSearchPokemonList(this.filteredItems);
    this.router.navigate(['/searchPage']);
  }

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
