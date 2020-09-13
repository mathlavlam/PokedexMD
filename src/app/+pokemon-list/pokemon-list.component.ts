import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NamedAPIResource, NamedAPIResourceList } from 'pokeapi';
import { toQueryString } from '../core/helpers/toQueryString';
import { PokedexAPIService } from '../core/services/pokedex-api/pokedex-api.service';

@Component({
	selector: 'pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
	//#region Template bound properties
	public searchForm: FormGroup;

	public isLoading: boolean = true;

	public pokemonTypes: NamedAPIResource<any>[] = [];

	public results: NamedAPIResource<any>[] = [];

	public page: number = 0;

	public perPage: number = 20;

	public totalCount: number = 0;
	//#endregion

	//#region Lifecycles
	constructor(
		private fb: FormBuilder,
		private pokedexAPI: PokedexAPIService) { }

	ngOnInit(): void {
		this.fetchData();
		this.buildForm();
	}
	//#endregion

	public onSearchFormSubmit(): void {
		this.lauchSearch();
	}

	public getPokemonTypeID(url: string): number {
		return this.pokedexAPI.getIDFromURL('type', url);
	}

	public onPageChange(evt: PageEvent): void {
		this.page = evt.pageIndex;
		this.perPage = evt.pageSize;
		this.lauchSearch();
	}

	//#region Private methods
	private buildForm(): void {
		this.searchForm = this.fb.group({
			type: [null]
		});
	}

	private async fetchData(): Promise<void> {
		this.isLoading = true;

		try {
			await this.fetchPokemonTypes();
			await this.lauchSearch();
		} catch (e) {
			console.error(e);
		}
	}

	private async fetchPokemonTypes(): Promise<void> {
		const { results } = await this.pokedexAPI.get<NamedAPIResourceList<NamedAPIResource<any>>>('type');

		this.pokemonTypes = results;
	}

	private async lauchSearch(ignoreLoading: boolean = false): Promise<void> {
		if (!ignoreLoading) {
			this.isLoading = true;
		}

		try {
			const urlParams = this.paginationToLimitOffset();

			if (this.searchForm.value.type) {
				urlParams.type = this.searchForm.value.type;
			}

			const url: string = 'pokemon' + toQueryString(urlParams);
			const { results, count } = await this.pokedexAPI.get<NamedAPIResourceList<NamedAPIResource<any>>>(url);

			this.totalCount = count;
			this.results = results;
		} catch (e) {
			console.error(e);
		} finally {
			if (!ignoreLoading) {
				this.isLoading = false;
			}
		}
	}

	private paginationToLimitOffset(): any {
		return {
			limit: this.perPage,
			offset: this.page * 20
		};
	}
	//#endregion
}
