import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'pokeapi';

@Component({
	selector: 'pokemon-types-icons',
	templateUrl: './pokemon-types-icons.component.html',
	styleUrls: ['./pokemon-types-icons.component.scss']
})
export class PokemonTypesIconsComponent implements OnInit {
	//#region Inputs
	@Input()
	public pokemon: Pokemon;

	@Input()
	public tooltipPosition: string = 'above';
	//#endregion

	//#region
	constructor() { }

	ngOnInit(): void { }
	//#endregion
}
