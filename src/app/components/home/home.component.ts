import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})

export class HomeComponent {

  newSongs: any[] = [];
  loading: boolean;
  error: boolean;
  msjError: string;
  
  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
    .subscribe( (data: any) => {      
      this.newSongs = data;      
    }, ( err ) => {
      this.error = true;
      this.msjError = err.error.error.message;
    });
    this.loading = false;
  }

}
