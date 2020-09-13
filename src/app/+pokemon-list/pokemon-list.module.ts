import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';

@NgModule({
	declarations: [PokemonListComponent, PokemonItemComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatCardModule,
		MatTooltipModule,
		MatPaginatorModule,
		RouterModule,
		RouterModule.forChild([{
			path: '',
			component: PokemonListComponent
		}])
	]
})
export class PokemonListModule { }
