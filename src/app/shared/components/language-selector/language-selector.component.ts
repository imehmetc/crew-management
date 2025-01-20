import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations'; // Animasyon sağlayıcısı
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [provideAnimations()],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  languages = ['en', 'fr', 'pt'];
  selectedLanguage = 'en';

  useLanguage(language: string): void {
    this.translate.use(language);
    console.log('Selected language:', language);
  }

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'pt']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    console.log(browserLang);
    this.translate.use(
      browserLang && this.translate.getLangs().includes(browserLang)
        ? browserLang
        : 'en'
    );
  }
}
