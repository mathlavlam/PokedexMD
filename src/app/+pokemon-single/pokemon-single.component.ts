import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ability, EvolutionChain, Pokemon, PokemonSpecies } from 'pokeapi';
import { PokeAPIService } from '../core/services/pokeapi/pokeapi.service';

@Component({
	selector: 'pokemon-single',
	templateUrl: './pokemon-single.component.html',
	styleUrls: ['./pokemon-single.component.scss']
})
export class PokemonSingleComponent implements OnInit {
	//#region Template bound properties
	public isLoading: boolean = true;

	public pokemon: Pokemon;

	public species: PokemonSpecies;

	public evolutionChain: EvolutionChain;
	//#endregion

	//#region Lifecycles
	constructor(
		private route: ActivatedRoute,
		private pokeAPI: PokeAPIService) {}

	ngOnInit(): void {
		this.route.params.subscribe({
			next: this.onRouteParamsChange.bind(this)
		});

		this.onRouteParamsChange();
	}
	//#endregion

	public getEvolutionImageSrc(url: string): string {
		const evolutionID: number = this.pokeAPI.getIDFromURL('pokemon-species', url);

		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ evolutionID }.svg`;
	}

	public getIDFromURL(url: string): number {
		return this.pokeAPI.getIDFromURL('pokemon-species', url);
	}

	//#region Private methods
	private onRouteParamsChange(): void {
		if (this.route.snapshot.params.id) {
			this.fetchPokemon(this.route.snapshot.params.id);
		}
	}

	private async fetchPokemon(pokemonID: number | string): Promise<void> {
		this.isLoading = true;

		try {
			const isFirstLoad: boolean = this.pokemon === undefined;

			this.pokemon = await this.pokeAPI.get(`pokemon/${ pokemonID }/`);
			await this.fetchSpecies();

			if (isFirstLoad) {
				await this.fetchEvolutionChain();
			}
		} catch (e) {
			console.error(e);
		} finally {
			this.isLoading = false;
		}
	}

	private async fetchSpecies(): Promise<void> {
		const species: PokemonSpecies = await this.pokeAPI.get(this.pokemon.species.url, null, true);

		species.flavor_text_entries = species.flavor_text_entries.filter(text => text.language.name === 'en');

		this.species = species;
	}

	private async fetchEvolutionChain(): Promise<void> {
		this.evolutionChain = await this.pokeAPI.get(this.species.evolution_chain.url, null, true);
	}
	//#endregion
}
