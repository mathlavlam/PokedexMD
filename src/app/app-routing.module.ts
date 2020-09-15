import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: 'pokemons',
		loadChildren: () => import('./+pokemon-list/pokemon-list.module').then(mod => mod.PokemonListModule)
	}, {
		path: 'pokemon/:id',
		loadChildren: () => import('./+pokemon-single/pokemon-single.module').then(mod => mod.PokemonSingleModule)
	},


	{
		path: '',
		redirectTo: 'pokemons',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		useHash: true,
		onSameUrlNavigation: 'reload'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
