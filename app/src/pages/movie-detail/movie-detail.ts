import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html'
})
export class MovieDetailPage {
  movie: any;
  stars: any[] = [0, 0, 0, 0, 0];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService) {
    this.movie = this.theaterService.getMovie(this.navParams.get('movieName'));
    // 计算全星星的数目
    this.stars = Array(Math.floor(Math.round(this.movie.rating.average) / 2)).fill(2);
    // 计算半星星的数目
    if (Math.round(this.movie.rating.average) % 2) this.stars.push(1);
    // 补空星星
    while (this.stars.length < 5) this.stars.push(0);
    console.log(this.stars);
  }

}
