import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

import { PokeApiService } from './shared/poke-api.service';
import { PokemonTileComponent } from './pokemon-tile/pokemon-tile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PokemonDetailPageComponent } from './pokemon-detail-page/pokemon-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PokemonTileComponent,
    SearchPageComponent,
    PokemonDetailPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    NgImageSliderModule
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
