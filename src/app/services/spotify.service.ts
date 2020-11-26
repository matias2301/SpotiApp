import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { };

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAp4hojnIopx0JDijq_EUZ7uCaNX_G--SqpQhcEQ_x7ylguUv8Scb-emXuwPsqjQGkHR4m3t5VeN4xQrEcCHahW4SueH0S-njFdPBHtqf81EfboYVc2YuenlJCEgtTsBdqGmOsO7USs'
    });

    return this.http.get( url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
            .pipe( map( data => data['albums'].items ));
  }

  getArtists( term: string ) {
    return this.getQuery(`search?q=${term}&type=artist&limit=20`)
            .pipe( map( data => data['artists'].items ));
  }

  getArtist( id: string ) {
    return this.getQuery(`artists/${id}`);
            // .pipe( map( data => data['artists'].items ));
  }

  getTopTracks( id: string ){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
            .pipe( map( data => data['tracks'] ));
  }
}
