import { Component } from '@angular/core';
import { LangService } from '../../core/services/lang.service';

@Component({
  selector: LangSelectorComponent.selector,
  templateUrl: './langselector.component.html',
  styleUrls: ['./langselector.component.css']
})
export class LangSelectorComponent {
  static selector = 'app-langselector';

  constructor(private langService: LangService) {
  }

  setLang(lang: string): void {
    this.langService.setLang(lang);
  }

  getLangs(): string[] {
    return this.langService.getLangs();
  }

  isActive(lang: string) {
    return this.langService.getCurrentLang() === lang;
  }
}
