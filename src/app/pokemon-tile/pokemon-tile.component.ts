import { Component, OnInit, Input } from '@angular/core';
import { PokeApiService } from '../shared/poke-api.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pokemon-tile',
  templateUrl: './pokemon-tile.component.html',
  styleUrls: ['./pokemon-tile.component.scss']
})
export class PokemonTileComponent implements OnInit {
  private subscription: Subscription;
  @Input() pokemon;
  private isTodaysPokemonFetched: Boolean = false;
  private imageObject: Array<any> = [];


  constructor(private pokeApiService: PokeApiService) {
    this.fetchTodaysPokemom();
  }

  ngOnInit() {
    this.generateTileData(this.pokemon);
  }

  generateTileData(currentPokemon) {
    if (currentPokemon) {
      this.pokemon = currentPokemon;
      let images = currentPokemon['sprites'], imageKeys = Object.keys(images);
      for (let i = 0; i < imageKeys.length; i++) {
        if (images[imageKeys[i]] != null) {
          this.imageObject.push({
            image: images[imageKeys[i]],
            thumbImage: images[imageKeys[i]],
            alt: 'alt of image'
          })
        }
      }
    }

  }

  fetchTodaysPokemom() {
    this.subscription = this.pokeApiService.todaysPokemonUpdated.subscribe(
      (todaysPokemon) => {
        this.generateTileData(todaysPokemon);
        this.isTodaysPokemonFetched = true;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
