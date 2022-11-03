import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'local',
    loadComponent: () =>
      import('./local-page/local-page.component').then(
        (m) => m.LocalPageComponent
      ),
  },
  { path: '**',   redirectTo: '/local', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
