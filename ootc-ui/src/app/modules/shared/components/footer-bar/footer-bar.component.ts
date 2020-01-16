import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/interfaces/ILanguage';
import { LocaleService } from 'src/app/services/locale.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent implements OnInit {
  public languages: ILanguage[];
  public legacyMode: boolean;

  constructor(private localeService: LocaleService) { }

  ngOnInit() {
    this.legacyMode = environment.legacy;
    this.languages = this.localeService.getLanguages();
  }

  changeLang(language: ILanguage) {
    this.localeService.changeLocale(language);
  }
}
