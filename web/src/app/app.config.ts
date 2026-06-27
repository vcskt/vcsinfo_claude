import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './i18n/transloco.loader';

const defaultLanguage = 'pt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideTransloco({
      config: {
        availableLangs: ['pt', 'en', 'es'],
        defaultLang: defaultLanguage,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        missingHandler: { logMissingKey: false },
      },
      loader: TranslocoHttpLoader,
    }),
    { provide: LOCALE_ID, useValue: defaultLanguage },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
};
