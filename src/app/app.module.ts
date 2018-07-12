// Dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HacModule } from 'handy-angular-components';

// Modules
import { CoreModule } from './core/core.module';
import { BandsInTownModule } from './bandsintown-sample/bandsintown.module';

// Components
import { LangSelectorComponent } from './components/localization/langselector.component';
import { DatepickerSampleComponent } from './components/datepicker/datepicker-sample.component';
import { BandsInTownSearchComponent } from './bandsintown-sample/components/bandsintown-search.component';

// Locale
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEs, 'es');

import { ComponentBootstrapper } from './component-bootstrapper';

// Register top level (root) components (each one has static property 'selector' declared)
const rootComponents = [
  LangSelectorComponent,
  DatepickerSampleComponent,
  BandsInTownSearchComponent
];

@NgModule({
  declarations: [
    LangSelectorComponent,
    DatepickerSampleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HacModule.forRoot(),
    CoreModule.forRoot(),
    BandsInTownModule
  ],

  /**
   * Define the root components to generate factories. Without this,
   * bootstrapping multiple components won't be possible as factories
   * are not generated
   */
  entryComponents: rootComponents
})
export class AppModule {
  /**
   * Implement a custom bootstrap which allows bootstrapping multiple
   * root components. See ComponentBootstrapper implementation for more
   * details
   */
  ngDoBootstrap(appRef: ApplicationRef) {
    ComponentBootstrapper.bootstrap(appRef, rootComponents);
  }
}
