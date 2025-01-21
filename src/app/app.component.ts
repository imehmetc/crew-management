import { Component } from '@angular/core';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { CrewListComponent } from './modules/crew/pages/crew-list/crew-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CrewRoutingModule } from './modules/crew/crew-routing.module';
import { MatDialog } from '@angular/material/dialog';
import { CrewAddDialogComponent } from './modules/crew/components/crew-add-modal/crew-add-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LanguageSelectorComponent,
    TranslateModule,
    CrewListComponent,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CrewRoutingModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openCrewAddDialog() {
    const dialogRef = this.dialog.open(CrewAddDialogComponent, {
      width: '10000px',
    });
  }
}
