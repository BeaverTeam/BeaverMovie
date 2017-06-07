import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html'
})
export class RecommendPage {
  movies: any = [];
  pageNum: number = 1;  // 当前获取的电影页数

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController) {
    // 显示 loading
    let loading = loadingCtrl.create({content: '正在加载...'});
    loading.present();
    theaterService.getRecommendMovies().subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        this.movies = data.data;
      } else {
        // TODO 异常处理
      }
    });
  }
}
