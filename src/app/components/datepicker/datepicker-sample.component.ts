import { Component, OnInit, Input } from '@angular/core';
import { HacDatepickerOptions } from 'handy-angular-components';

@Component({
    selector: DatepickerSampleComponent.selector,
    templateUrl: './datepicker-sample.component.html',
    styleUrls: ['./datepicker-sample.component.css']
})
export class DatepickerSampleComponent implements OnInit {
    static selector = 'app-datepicker-sample';
    selectedSingleDate: Date;
    datepickerSingleOptions: HacDatepickerOptions;

    ngOnInit() {
        const today = new Date();

        // Simple date picker with single dates and 1 visible month calendar, custom date formatting
        this.datepickerSingleOptions = {
            showMonths: 1,
            enableTodayAction: true,
            todayActionLabel: 'Today'
        };
    }
}
