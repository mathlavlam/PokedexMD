import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, NamedAPIResource } from 'pokeapi';
import { PokeAPIService } from 'src/app/core/services/pokeapi/pokeapi.service';

@Component({
	selector: 'pokemon-item',
	templateUrl: './pokemon-item.component.html',
	styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
	//#region Template bound properties
	public isLoading: boolean = true;

	public pokemonData: Pokemon;

	public pokemonID: number;
	//#endregion

	//#region Inputs
	@Input('pokemon')
	public pokemonPreview: NamedAPIResource<any>;

	@Input()
	public linkParams: any;
	//#endregion

	//#region Lifecycles
	constructor(private pokedexAPI: PokeAPIService) { }

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
		this.isLoading = true;

		try {
			this.pokemonData = await this.pokedexAPI.get(`pokemon/${ this.pokemonID }/`);
			this.isLoading = false;
		} catch (e) {
			console.error(e);
		}
	}
	//#endregion
}
