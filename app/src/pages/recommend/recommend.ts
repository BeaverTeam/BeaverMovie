import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html'
})
export class RecommendPage {
  movies: any = [];
  pageNum: number = 1;  // 当前获取的电影页数

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService) {
    theaterService.getMovies(this.pageNum).subscribe((data) => {
      if (data.state == 'success') {
        this.movies = data.data;
      } else {
        // TODO 异常处理
      }
    });
  }

}
