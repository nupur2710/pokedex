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
  constructor(private route: ActivatedRoute, private pokeApiService: PokeApiService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.pokeApiService.fetchPokemonData(this.id)
        .map(response => {
          console.log(response)
        })
        .subscribe(data => console.log(data));

    });
    console.log(this.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}