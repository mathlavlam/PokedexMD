import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PokemonSingleComponent } from './pokemon-single.component';
import { PokemonTypesIconsModule } from '../shared/components/pokemon-types-icons/pokemon-types-icons.module';

@NgModule({
  declarations: [PokemonSingleComponent],
  imports: [
	CommonModule,
	MatProgressSpinnerModule,
	PokemonTypesIconsModule,
	RouterModule,
	RouterModule.forChild([{
		path: '',
		component: PokemonSingleComponent
	}])
  ]
})
export class PokemonSingleModule { }
