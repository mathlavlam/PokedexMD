import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toQueryString } from '../../helpers/toQueryString';
import { Pokemon } from 'pokeapi';

@Injectable({providedIn: 'root'})
export class PokedexAPIService {


	//#region Private static properties
	private static readonly API_URL: string = 'https://pokeapi.co/api/v2';
	//#endregion

	//#region Lifecycles
	constructor(
		private http: HttpClient) {}
	//#endregion

	//#region Public methods
	public get<T = any>(endpoint: string, params?: any): Promise<T> {
		return this.http
			.get(`${PokedexAPIService.API_URL}/${ endpoint + toQueryString(params) }`)
			.toPromise() as any;
	}

	public getPokemonData(id: number): Promise<Pokemon> {
		return this.get(`pokemon/${ id }`);
	}

	public getIDFromURL(type: string, url: string): number {
		const regExp: RegExp = new RegExp(type + '\\/(\\d+)\\/?');
		const IDMatch: RegExpMatchArray = url.match(regExp);

		return IDMatch ? +IDMatch[1] : null;
	}
	//#endregion
}
