import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any = [];

  constructor(public navCtrl: NavController, public theaterService: TheaterService) {
    this.movies = this.theaterService.getMovies();
  }

  // 前往消息中心
  gotoNotes() {

  }

  // 前往电影详情页面
  gotoDetail(index) {
    
  }


}
