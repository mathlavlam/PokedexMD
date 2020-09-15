import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PokemonListComponent } from './pokemon-list.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { PokemonTypesIconsModule } from '../shared/components/pokemon-types-icons/pokemon-types-icons.module';

@NgModule({
	declarations: [PokemonListComponent, PokemonItemComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSelectModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		PokemonTypesIconsModule,
		RouterModule,
		RouterModule.forChild([{
			path: '',
			component: PokemonListComponent
		}])
	]
})
export class PokemonListModule { }
