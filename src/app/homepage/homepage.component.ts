import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../shared/poke-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  pokeApiData;
  filteredItems;
  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit() {
    this.pokeApiService.fetchPokeData()
      .subscribe(
        (data) => {
          this.pokeApiData = data;
        },
        (err) => console.log(err)
      )


  }

  searchPokemon(event) {
    var searchString = event.target.value;
    this.filteredItems = this.pokeApiData.filter(item => {
      return item['name'].indexOf(searchString) > -1;
    });

  }

}
