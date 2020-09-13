import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonSingleComponent } from './pokemon-single.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PokemonSingleComponent],
  imports: [
	CommonModule,
	RouterModule,
	RouterModule.forChild([{
		path: '',
		component: PokemonSingleComponent
	}])
  ]
})
export class PokemonSingleModule { }
