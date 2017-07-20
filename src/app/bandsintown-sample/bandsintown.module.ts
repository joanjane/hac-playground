// Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HacModule } from 'handy-angular-components';

// Modules
import { CoreModule } from '../core/core.module';

// Components
import { BandsInTownSearchComponent } from './components/bandsintown-search.component';
import { BandsInTownService } from './services/bandsintown.service';

@NgModule({
  declarations: [
    BandsInTownSearchComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HacModule
  ],
  providers: [
    BandsInTownService
  ],
  exports: [
    BandsInTownSearchComponent
  ]
})
export class BandsInTownModule {

}