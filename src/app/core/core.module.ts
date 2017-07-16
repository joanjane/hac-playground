import { NgModule, LOCALE_ID, ModuleWithProviders } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core/src/translate.store';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LangService, LangProvider } from './services/lang.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  exports: [
    TranslateModule
  ]
})
export class CoreModule {
  // set providers here instead of NgModule to be initialized only once
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        TranslateStore,
        LangService,
        {
          provide: LOCALE_ID,
          useFactory: LangProvider,
          deps: [LangService]
        }
      ]
    }
  }
}