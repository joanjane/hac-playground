import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Band, BandEvent, SearchBandEventsModel } from '../models';
import { DateUtils } from 'handy-angular-components'; // Date extensions to fix problems with formatting and regions

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

  constructor(private http: HttpClient) { }

  searchBandEvents(search: SearchBandEventsModel): Observable<BandEvent[]> {
    // https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0
    // GET /artists/rolling%20stones/events?app_id=test&date=2017-09-09%2C2018-09-10
    let range = `${this.formatIsoDate(search.startDate)},${this.formatIsoDate(search.endDate)}`;
    const request = `${this.apiHost}/artists/${search.bandName}/events` +
      `?app_id=${this.appId}&date=${range}`;
    console.log(`Searching bandsintown api events: ${request}`)

    return this.http.get<Array<any>>(request)
      .pipe(map(response => response.map(this.mapEvent)));
  }

  getBands(): Band[] {
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
    return DateUtils.formatDatePart(date);
  }
}
