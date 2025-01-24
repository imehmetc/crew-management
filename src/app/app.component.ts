import { Component } from '@angular/core';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CrewRoutingModule } from './modules/crew/crew-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LanguageSelectorComponent,
    TranslateModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CrewRoutingModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
