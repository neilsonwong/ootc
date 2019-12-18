// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8000/api/v1',
  BASE_DOMAIN: undefined,
  languages: [
    {
      locale: 'en-US',
      name: 'English',
      url: 'http://localhost:4200'
    },
    {
      locale: 'zh-Hant',
      name: '中文 (繁體)',
      url: 'http://localhost:4201'
    },
    {
      locale: 'zh-Hans',
      name: '中文 (简体)',
      url: 'http://localhost:4201'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
