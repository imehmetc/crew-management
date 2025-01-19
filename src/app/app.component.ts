import { Component } from '@angular/core';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { CrewListComponent } from './modules/crew/pages/crew-list/crew-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LanguageSelectorComponent,
    TranslateModule,
    CrewListComponent,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
