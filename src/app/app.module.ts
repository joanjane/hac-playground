import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HacModule } from 'handy-angular-components';

import { CoreModule } from './core/core.module';

import { ComponentBootstrapper } from './component-bootstrapper';
import { LangSelectorComponent } from './components/localization/langselector.component';
import { DatepickerSampleComponent } from './components/datepicker/datepicker-sample.component';

// Register top level (root) components (each one has static property 'selector' declared)
const rootComponents = [LangSelectorComponent, DatepickerSampleComponent];
rootComponents.forEach(c => ComponentBootstrapper.registerRootComponent(c, c.selector));

@NgModule({
  declarations: [
    LangSelectorComponent,
    DatepickerSampleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HacModule.forRoot(),
    CoreModule.forRoot()
  ],
  entryComponents: rootComponents
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    ComponentBootstrapper.bootstrap(appRef);
  }
}

// AOT Support with exported function
export function entryComponents() {
  return ComponentBootstrapper.getRegisteredRootComponents();
}
