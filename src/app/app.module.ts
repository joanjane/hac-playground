import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HacModule } from 'handy-angular-components';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DatepickerSampleComponent } from 'app/datepicker/app-datepicker-sample.component';
import { LangService } from 'app/core/services/lang.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export function LangProvider(langService: LangService): string {
  return langService.getCurrentLang();
}

@NgModule({
  declarations: [
    AppComponent,
    DatepickerSampleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HacModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  providers: [
    LangService,
    {
      provide: LOCALE_ID,
      useFactory: LangProvider,
      deps: [LangService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
