import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        TranslocoTestingModule.forRoot({
          langs: { pt: {} },
          translocoConfig: { availableLangs: ['pt'], defaultLang: 'pt' },
        }),
      ],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
