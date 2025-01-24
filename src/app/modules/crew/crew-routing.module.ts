import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewCardComponent } from './pages/crew-card/crew-card.component';

const routes: Routes = [
  { path: 'crew-card/:id', component: CrewCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrewRoutingModule {}
