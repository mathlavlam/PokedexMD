import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toQueryString } from '../../helpers/toQueryString';

@Injectable({providedIn: 'root'})
export class PokeAPIService {
	//#region Private static properties
	private static readonly API_URL: string = 'https://pokeapi.co/api/v2';
	//#endregion

	//#region Lifecycles
	constructor(private http: HttpClient) {}
	//#endregion

	//#region Public methods
	public get<T = any>(endpoint: string, params?: any, isFullURL: boolean = false): Promise<T> {
		const url: string = isFullURL ? endpoint : `${ PokeAPIService.API_URL }/${ endpoint + toQueryString(params) }`;

		return this.http.get(url).toPromise() as any;
	}

	public getIDFromURL(type: string, url: string): number {
		const regExp: RegExp = new RegExp(type + '\\/(\\d+)\\/?');
		const IDMatch: RegExpMatchArray = url.match(regExp);

		return IDMatch ? +IDMatch[1] : null;
	}
	//#endregion
}
