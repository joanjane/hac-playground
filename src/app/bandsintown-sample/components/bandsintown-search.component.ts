import { Component, OnInit, Input, ViewEncapsulation, OnDestroy, HostListener } from '@angular/core';
import { HacDatepickerOptions, HacDropdownOptionGroup } from 'handy-angular-components';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BandsInTownService } from '../services/bandsintown.service';
import { Band, SearchBandEventsModel, BandEvent } from '../models';

@Component({
    selector: BandsInTownSearchComponent.selector, // instead of writing a selector here, use a static prop
    templateUrl: './bandsintown-search.component.html',
    styleUrls: ['./bandsintown-search.component.css'],
    encapsulation: ViewEncapsulation.None // Don't encapsulate CSS to allow style overriding
})
export class BandsInTownSearchComponent implements OnInit, OnDestroy {
    // This is used at AppModule.ngDoBootstrap() as a trick to register
    // automatically this component as a multiroot component
    static selector = 'app-bands-search';

    locale = {};
    datepickerOptions: HacDatepickerOptions = {};
    subscriptions: ISubscription[] = [];
    searchForm: FormGroup;
    bandsDropdown: HacDropdownOptionGroup[] = [];
    events: BandEvent[];
    newBand: string = '';
    submitted = false;

    constructor(
        private translateService: TranslateService,
        private formBuilder: FormBuilder,
        private bandsService: BandsInTownService) { }

    ngOnInit(): void {
        // get subscription of translate service to unsubscribe later
        this.subscriptions.push(
            // get translations for this component
            this.translateService.get('BANDSINTOWN').subscribe((labels) => {
                this.locale = labels;
                this.setDatepickerOptions({
                    startDatePlaceholder: this.locale['START_DATE'],
                    endDatePlaceholder: this.locale['END_DATE']
                });
            })
        );

        this.buildDatepickerOptions();

        this.buildForm();

        this.buildDropdown();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onSubmit(event: any): void {
        this.submitted = true;
        if (this.searchForm.invalid) {
            console.log('Invalid form', this.searchForm);
            return;
        }

        const search = {
            bandName: this.searchForm.value.bandName,
            startDate: this.searchForm.value.dates.startDate,
            endDate: this.searchForm.value.dates.endDate
        };
        this.bandsService.searchBandEvents(search)
            .subscribe((events) => {
                console.log(`Got ${events.length} results`);
                this.events = events;
            }, (error) => {
                console.error('Error searching band events', error);
            });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const smallDevicesBreak = 640;
        // Use 1 month calendar on small devices
        const showMonths = (window.innerWidth <= smallDevicesBreak) ? 1 : 2;
        this.setDatepickerOptions({ showMonths });
    }

    addBand(): void {
        if (this.newBand) {
            this.bandsService.addBand(this.newBand);
            this.buildDropdown();
            this.newBand = '';
        }
    }


    private buildForm(): void {
        this.searchForm = this.formBuilder.group({
            bandName: new FormControl(null, Validators.required),
            dates: new FormControl(null, Validators.required)
        });
    }

    private buildDatepickerOptions(): void {
        this.setDatepickerOptions({
            showMonths: 2,
            range: true,
            minDate: new Date(), // don't allow past dates
            elementId: 'eventdate',
            enableTodayAction: false,
            startDateFormat: 'shortDate',
            endDateFormat: 'shortDate'
        });
    }

    private buildDropdown(): any {
        this.bandsDropdown = [
            {
                options: this.bandsService.getBands().map(b => {
                    return {
                        key: b.name,
                        label: b.name
                    };
                })
            }
        ];
    }

    // Important! When updating datepicker options:
    // Use immutability when changing options properties, because angular detects
    // changes on inputs when the object reference has changed, but NOT when a property
    // of an object changes. In angular 1.x maybe you used $scope.apply().
    private setDatepickerOptions(updatedProperties: HacDatepickerOptions) {
        this.datepickerOptions = Object.assign({}, this.datepickerOptions, updatedProperties);
    }
}