import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LangService {
    private readonly defaultLang: string = 'es';
    appLangs = ['en', 'es'];

    constructor(private translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(this.defaultLang);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        if (!this.getCurrentLang()) {
            this.setLang(this.defaultLang);
        }
    }

    getCurrentLang(): string {
        return sessionStorage.getItem('hac-playground-language') as string;
    }

    setLang(lang, skipRefresh: boolean = false): void {
        if (lang === this.getCurrentLang()) {
            return;
        }

        sessionStorage.setItem('hac-playground-language', lang);
        this.translate.use(lang);
        window.location.reload(); // Patch: reload window to apply language
    }

    getLangs(): string[] {
        return this.appLangs;
    }


}