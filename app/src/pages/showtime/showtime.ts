import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ShowseatPage } from '../showseat/showseat';
import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-showtime',
  templateUrl: 'showtime.html',
})
export class ShowtimePage {
  // 页面信息
  movieId: number;
  cinemaName: string;
  cinemaId: number;

  showtimes: any = [];  // 电影场次
  movies: any = [];  // 出现过的电影
  position: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private theaterService: TheaterService, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, public appCtrl: App) {
    // 获取信息
    this.movieId = this.navParams.get('movieId');
    this.cinemaName = this.navParams.get('cinemaName');
    this.cinemaId = this.navParams.get('cinemaId');
  }

  ionViewWillEnter() {
    this.showtimes = [];
    this.movies = [];
    // 显示 loading
    let loading = this.loadingCtrl.create({content: '正在加载...'});
    loading.present();
    // 请求场次信息
    this.theaterService.getCinemaShowtimes(this.cinemaId).subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        let counter = 0;
        for (let showtime of data.data) {
          showtime.preciseTime = showtime.startTime.split(' ')[1];
          showtime.date = showtime.startTime.split(' ')[0];
          this.showtimes.push(showtime);
          // 计算出现过的电影
          let flag = true;
          for (let movie of this.movies)
            if (movie.id == showtime.movie.id)
              flag = false;
          if (!flag) continue;
          // 计算星星
          let stars: any[] = [0, 0, 0, 0, 0];
          // 计算全星星的数目
          stars = Array(Math.floor(Math.round(showtime.movie.rating) / 2)).fill(2);
          // 计算半星星的数目
          if (Math.round(showtime.movie.rating) % 2) stars.push(1);
          // 补空星星
          while (stars.length < 5) stars.push(0);
          showtime.movie.stars = stars;
          this.movies.push(showtime.movie);
          if (showtime.movie.id == this.movieId)
            this.position = counter;
          counter++;
        }
        this.showtimes.sort(function(a, b) {
          let startTimeA = a.startTime.split(' ');
          let startDateA = new Date(startTimeA[0] + 'T' + startTimeA[1] + ':00');
          let startTimeB = b.startTime.split(' ');
          let startDateB = new Date(startTimeB[0] + 'T' + startTimeB[1] + ':00');
          if (startDateA > startDateB) return 1
          else if (startDateA < startDateB) return -1;
          else return 0;
        });
        // 设置初始位置
        let interval = setInterval(() => {
          let movies = document.getElementById('movies');
          if (movies) {
            movies.style.left = '-' + this.position + '00%';
            clearInterval(interval);
          }
        }, 100);
      } else {
        if (data.message == '未登录')
          this.appCtrl.getRootNav().push(LoginPage);
        else
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

  changeFilm(direction: boolean) {
    if (direction)
      this.position++;
    else
      this.position--;
  }

  gotoSeat(showtime) {
    this.navCtrl.push(ShowseatPage, {showtime: showtime});
  }

}
