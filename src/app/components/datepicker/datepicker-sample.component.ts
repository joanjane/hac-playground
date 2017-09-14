import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { HacDatepickerOptions } from 'handy-angular-components';
import { TranslateService } from "@ngx-translate/core";
import { ISubscription } from "rxjs/Subscription";

@Component({
    selector: DatepickerSampleComponent.selector,
    templateUrl: './datepicker-sample.component.html',
    styleUrls: ['./datepicker-sample.component.css'],
    encapsulation: ViewEncapsulation.None // Don't encapsulate CSS to allow override classes outside
})
export class DatepickerSampleComponent implements OnInit, OnDestroy {
    datepickerSampleLocale = {};
    static selector = 'app-datepicker-sample';
    selectedSingleDate: Date;
    datepickerSingleOptions: HacDatepickerOptions = {};
    subscriptions: ISubscription[] = [];

    constructor(private translateService: TranslateService) {
        // get subscription of translate service to unsuscribe later
        this.subscriptions.push(
            // get translations for this component
            translateService.get('DATEPICKER_SAMPLE').subscribe((labels) => {
                this.datepickerSampleLocale = labels;
                this.buildDatepickerOptions();
            })
        );
    }

    ngOnInit() {
        this.buildDatepickerOptions();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private buildDatepickerOptions(): void {
        // Simple date picker with single dates and 1 visible month calendar, custom date formatting
        this.datepickerSingleOptions.showMonths = 1;
        this.datepickerSingleOptions.enableTodayAction = true;
        this.datepickerSingleOptions.enableClearAction = true;
        this.datepickerSingleOptions.startDatePlaceholder = this.datepickerSampleLocale['SELECT'];
    }
}
