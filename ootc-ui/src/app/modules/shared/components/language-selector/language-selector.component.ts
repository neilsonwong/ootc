import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/interfaces/ILanguage';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  public languages: ILanguage[];

  constructor(private localeService: LocaleService) { }

  ngOnInit() {
    this.languages = this.localeService.getLanguages();
  }

  changeLang(language: ILanguage) {
    this.localeService.changeLocale(language);
  }
}
