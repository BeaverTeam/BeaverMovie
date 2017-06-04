import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-showtime',
  templateUrl: 'showtime.html',
})
export class ShowtimePage {
  movieId: number;
  title: string;
  cinemaId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // 获取信息
    this.movieId = this.navParams.get('movieId');
    this.title = this.navParams.get('movieTitle');
    this.cinemaId = this.navParams.get('cinemaId');
  }

}
