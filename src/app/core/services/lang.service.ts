import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Injectable()
export class LangService {
    private readonly localStorageLangKey = 'hac-playground-language';

    constructor(private translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(environment.settings.defaultLanguage);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.setLang(this.getCurrentLang() || environment.settings.defaultLanguage, true);
    }

    getCurrentLang(): string {
        const currentLang = localStorage.getItem(this.localStorageLangKey) as string;
        return this.getLangs().find(l => l === currentLang); // Ensure valid language
    }

    setLang(lang, skipRefresh: boolean = false): void {
        localStorage.setItem(this.localStorageLangKey, lang);
        this.translate.use(lang);
        if (lang !== this.getCurrentLang() || !skipRefresh) {
            window.location.reload(); // Patch: reload window to apply language
        }
    }

    getLangs(): string[] {
        return environment.settings.appLanguages;
    }
}


export function LangProvider(langService: LangService): string {
  return langService.getCurrentLang();
}