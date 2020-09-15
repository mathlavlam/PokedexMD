import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypesIconsComponent } from './pokemon-types-icons.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [PokemonTypesIconsComponent],
	imports: [
		CommonModule,
		MatTooltipModule,
	],
	exports: [PokemonTypesIconsComponent]
})
export class PokemonTypesIconsModule { }
