import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html'
})
export class MovieDetailPage {
  movie: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService) {
    this.movie = this.theaterService.getMovie(this.navParams.get('movieName'));
  }

}
