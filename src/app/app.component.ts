import { Component } from '@angular/core';
import { LangService } from './core/services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Handy Angular Components playground';

  constructor(private langService: LangService) {
  }

  setLang(lang: string): void {
    this.langService.setLang(lang);
  }

  getLangs(): string[] {
    return this.langService.getLangs();
  }
}
