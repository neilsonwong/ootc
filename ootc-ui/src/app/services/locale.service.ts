import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ILanguage } from 'src/app/interfaces/ILanguage';
import * as docCookies from 'src/app/utils/docCookies';
import { COOKIE_AUTH_CONTEXT } from 'src/app/constants/storage-constants';

const LANGUAGES: ILanguage[] = environment.languages;

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(
    private authService: AuthenticationService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    if (environment.BASE_DOMAIN) {
      document.domain = environment.BASE_DOMAIN;
    }
  }

  getLanguages(): ILanguage[] {
    return LANGUAGES;
  }

  getLocale(): string {
    return this.locale;
  }

  changeLocale(lang: ILanguage): void {
    // save the desired locale to the cookies
    // localStorage.setItem('preferredLocale', lang.locale);
    docCookies.setItem('preferredLocale', lang.locale, Infinity, '/', environment.BASE_DOMAIN);

    // if we are on the right locale, do nothing
    this.redirectToPreferredLocale();
  }

  redirectToPreferredLocale() {
    // const prefLocale = localStorage.getItem('preferredLocale');
    const prefLocale = docCookies.getItem('preferredLocale');

    if (this.getLocale() === prefLocale) {
      return;
    }
    else {
      // if they have an auth context, put it in!
      const authContext = this.authService.getAuthContext();
      if (authContext && authContext.securityClearance) {
        docCookies.setItem(COOKIE_AUTH_CONTEXT, JSON.stringify(authContext), 10, '/', environment.BASE_DOMAIN);
      }

      // renavigate the page to the right locale
      // find the right url
      const preferredLanguage = LANGUAGES.find((lang: ILanguage) => {
        return lang.locale === prefLocale;
      });

      if (preferredLanguage !== undefined) {
        // don't do this in angular, use window
        const urlPath = `${preferredLanguage.url}/${window.location.href.substring(window.location.origin.length)}`;
        window.location.href = urlPath;
      }
      else {
        console.log(`cannot redirect for locale ${prefLocale}`);
      }
    }
  }
}
