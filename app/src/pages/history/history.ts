import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  movies: any = [];
  colors: any = ['rgb(33, 68, 89)', 'rgb(25, 98, 115)', 'rgb(115, 1, 88)','rgb(154, 0, 68)'];
  futureMovies: any = [];
  pageNum: number = 1;
  tickets: string = 'type1';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController) {
    // 显示 loading
    let loading = loadingCtrl.create({content: '正在加载...'});
    loading.present();
    theaterService.getMovies(this.pageNum).subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        this.movies = data.data;
        this.futureMovies = this.movies.splice(3, 2);
      } else {
        // TODO 异常处理
      }
    });
  }

  getColor(i) {
    let num = i % 4;
    return this.colors[num];
  }

}
