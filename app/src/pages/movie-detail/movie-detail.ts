import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ShowtimePage } from '../showtime/showtime';
import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html'
})
export class MovieDetailPage {
  movie: any;
  stars: any[] = [0, 0, 0, 0, 0];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController) {
    // 显示 loading
    let loading = loadingCtrl.create({content: '正在加载...'});
    loading.present();
    this.theaterService.getMovie(this.navParams.get('movieId')).subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        this.movie = data.data;
        // 计算全星星的数目
        this.stars = Array(Math.floor(Math.round(this.movie.rating.average) / 2)).fill(2);
        // 计算半星星的数目
        if (Math.round(this.movie.rating.average) % 2) this.stars.push(1);
        // 补空星星
        while (this.stars.length < 5) this.stars.push(0);
      } else {
        // TODO 异常处理，未请求回电影信息
      }
    });
  }

  gotoBuyTicket() {
    this.navCtrl.push(ShowtimePage, {movieId: this.movie.id,
                                     movieTitle: this.movie.title});
  }

}
