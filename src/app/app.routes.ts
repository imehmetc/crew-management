import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CrewCardComponent } from './modules/crew/pages/crew-card/crew-card.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    title: 'Home Page',
  },
  {
    path: 'crew-card/:id',
    component: CrewCardComponent,
    title: 'Crew Detail Page',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
