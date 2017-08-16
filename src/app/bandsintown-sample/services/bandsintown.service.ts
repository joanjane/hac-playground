import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Band, BandEvent, SearchBandEventsModel } from '../models';
import 'handy-angular-components/extensions/date'; // Date extensions to fix problems with formatting and regions

@Injectable()
export class BandsInTownService {
    private readonly apiHost = 'https://rest.bandsintown.com';
    private readonly appId = 'hac-playground';
    private bands = [
        {
            name: 'Rolling Stones'
        },
        {
            name: 'Ramastons'
        },
        {
            name: 'Foo Fighters'
        },
        {
            name: 'U2'
        },
        {
            name: 'Guns and roses'
        },
        {
            name: 'Lady gaga'
        }
    ];
    
    constructor(private http: Http) { }

    searchBandEvents(search: SearchBandEventsModel): Observable<BandEvent[]> {
        // https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0
        // GET /artists/rolling%20stones/events?app_id=test&date=2017-09-09%2C2018-09-10
        let range = `${this.formatIsoDate(search.startDate)},${this.formatIsoDate(search.endDate)}`;
        const request = `${this.apiHost}/artists/${search.bandName}/events`;
        const params = `app_id=${this.appId}&date=${range}`;
        console.log(`Searching bandsintown api events: ${request}?${params}`)

        return this.http.get(request, {
            params: params
        }).map(response => (<Array<any>>response.json()).map(this.mapEvent))
    }

    getBands(): Band[]{
        return this.bands;
    }

    
    addBand(name: string): void {
        this.bands.push({ name });
    }

    private mapEvent(event: any): BandEvent {
        return {
            title: <string>event.venue.name,
            date: new Date(event.datetime),
            url: <string>event.url
        };
    }

    private formatIsoDate(date: Date): string {
        return date.formatDatePart();
    }
}