import { Component, OnInit } from '@angular/core';
import { HacDatepickerOptions } from "handy-angular-components";

@Component({
    selector: 'app-datepicker-sample',
    templateUrl: './app-datepicker-sample.component.html',
    styleUrls: ['./app-datepicker-sample.component.css']
})
export class DatepickerSampleComponent implements OnInit {
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
