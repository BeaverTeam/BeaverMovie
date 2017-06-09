import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { CinemaPage } from '../cinema/cinema';
import { WebviewPage } from '../webview/webview';
import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html'
})
export class MovieDetailPage {
  movie: any;
  stars: any[] = [0, 0, 0, 0, 0];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
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
        this.presentToast(data.message);
      }
    });
  }

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  gotoBuyTicket() {
    this.navCtrl.push(CinemaPage, {movieId: this.movie.id,
                                   movieTitle: this.movie.title});
  }

  gotoWebview(name: string) {
    this.navCtrl.push(WebviewPage, {name: name});
  }

}
