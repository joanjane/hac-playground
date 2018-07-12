import { NgModule, LOCALE_ID, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LangService, LangProvider } from './services/lang.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/hac-playground/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
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
