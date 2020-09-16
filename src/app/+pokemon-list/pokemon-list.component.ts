import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NamedAPIResource, NamedAPIResourceList } from 'pokeapi';
import { toQueryString } from '../core/helpers/toQueryString';
import { PokeAPIService } from '../core/services/pokeapi/pokeapi.service';

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

	public pageSize: number = 12;

	public totalCount: number = 0;
	//#endregion

	//#region Lifecycles
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private pokedexAPI: PokeAPIService,
		private scroll: ViewportScroller) { }

	ngOnInit(): void {
		if (this.route.snapshot.queryParams.page) {
			this.page = this.route.snapshot.queryParams.page;
		}

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
		this.pageSize = evt.pageSize;
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

			const { results, count } = await this.pokedexAPI.get<NamedAPIResourceList<NamedAPIResource<any>>>('pokemon', urlParams);

			this.totalCount = count;
			this.results = results;

			this.router.navigate([], {
				relativeTo: this.route,
				queryParams: {
					page: this.page
				}
			});

			this.scroll.scrollToPosition([0, 0]);
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
			limit: this.pageSize,
			offset: this.page * this.pageSize
		};
	}
	//#endregion
}
