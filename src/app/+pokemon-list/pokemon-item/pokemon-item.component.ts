import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, NamedAPIResource } from 'pokeapi';
import { PokedexAPIService } from 'src/app/core/services/pokedex-api/pokedex-api.service';

@Component({
	selector: 'pokemon-item',
	templateUrl: './pokemon-item.component.html',
	styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
	//#region Template bound properties
	public pokemonData: Pokemon;

	public pokemonID: number;
	//#endregion

	//#region Inputs
	@Input('pokemon')
	public pokemonPreview: NamedAPIResource<any>;
	//#endregion

	//#region Lifecycles
	constructor(private pokedexAPI: PokedexAPIService) { }

	ngOnInit(): void {
		this.setPokemonID();

		if (this.pokemonID) {
			this.fetchPokemonData();
		}
	}
	//#endregion

	//#region Private methods
	private setPokemonID(): void {
		const pokemonID: number = this.pokedexAPI.getIDFromURL('pokemon', this.pokemonPreview.url);

		if (pokemonID) {
			this.pokemonID = pokemonID;
		}
	}

	private async fetchPokemonData(): Promise<void> {
		this.pokemonData = await this.pokedexAPI.getPokemonData(this.pokemonID);
	}
	//#endregion
}
