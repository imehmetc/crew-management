import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { CrewCardComponent } from './modules/crew/pages/crew-card/crew-card.component';
import { NgModule } from '@angular/core';
import { CrewListComponent } from './modules/crew/pages/crew-list/crew-list.component';
import { CertificateTypeCreateComponent } from './modules/crew/pages/certificate-type-create/certificate-type-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'crew-list', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'crew-list', component: CrewListComponent, title: 'Crew List' },
  {
    path: 'crew-list/crew-card/:id',
    component: CrewCardComponent,
    title: 'Crew Detail Page',
  },
  {
    path: 'certificate-type-create',
    component: CertificateTypeCreateComponent,
    title: 'Add Certificate Type',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ActivatedRoute],
})
export class AppRoutingModule {}
