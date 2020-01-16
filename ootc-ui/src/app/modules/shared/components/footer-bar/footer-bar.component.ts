import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/interfaces/ILanguage';
import { LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent implements OnInit {
  public languages: ILanguage[];

  constructor(private localeService: LocaleService) { }

  ngOnInit() {
    this.languages = this.localeService.getLanguages();
  }

  changeLang(language: ILanguage) {
    this.localeService.changeLocale(language);
  }
}
