import { TranslocoLoader } from '@ngneat/transloco';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    // Load translation files from assets
    const filePath = `./assets/i18n/${lang}.json`;
    return fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${lang}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Translation load error:', error);
        return {};
      });
  }
}
