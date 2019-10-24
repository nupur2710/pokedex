import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { PokeApiService } from '../shared/poke-api.service';

@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
  styleUrls: ['./pokemon-detail-page.component.scss']
})
export class PokemonDetailPageComponent implements OnInit {
  private id: String;
  private subscription: Subscription;
  private pokemon: Object;
  private imageObject;
  private speciesData;
  private speciesInformation;

  constructor(private route: ActivatedRoute, private pokeApiService: PokeApiService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.pokeApiService.fetchPokemonData(this.id)
        .map(response => {
          this.pokemon = JSON.parse(response['_body']);
          this.generateTileData(this.pokemon);
          this.fetchInternalDetails(this.pokemon);
          console.log(this.pokemon);
        })
        .subscribe(data => console.log(data));

    });
    console.log(this.id);
  }

  generateTileData(currentPokemon) {
    if (currentPokemon) {
      this.pokemon = currentPokemon;
      this.imageObject = [];
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

  fetchInternalDetails(pokemon) {
    this.pokeApiService.fetchPokemonSpeciesData(this.id)
      .map(response => {
        this.speciesData = JSON.parse(response['_body']);
        console.log(this.speciesData);
        this.generateSpeciesDataObject();

      })
      .subscribe(data => console.log(data));
  }

  generateSpeciesDataObject() {
    let speciesData = this.speciesData, summary = '';
    let enSummaryList = this.speciesData["flavor_text_entries"].filter((item, index) => {
      if (item.language.name == 'en') {
        return item['flavor_text'];
      }
    });
    for (let i = 0; i < enSummaryList.length; i++) {
      summary += enSummaryList[i]['flavor_text'];
    }

    this.speciesInformation = {
      base_happiness: speciesData.base_happiness,
      color: speciesData.color && speciesData.color.name ? speciesData.color.name : null,
      capture_rate: speciesData.capture_rate,
      evolves_from_species: speciesData.evolves_from_species && speciesData.evolves_from_species.name ? speciesData.evolves_from_species.name : null,
      summary: summary,
      growth_rate: speciesData.growth_rate && speciesData.growth_rate.name ? speciesData.growth_rate.name : null,
      habitat: speciesData.habitat && speciesData.habitat.name ? speciesData.habitat.name : null,
      hatch_counter: speciesData.hatch_counter
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}