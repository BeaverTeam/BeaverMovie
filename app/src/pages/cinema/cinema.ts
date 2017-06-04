import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ShowtimePage } from '../showtime/showtime';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-cinema',
  templateUrl: 'cinema.html',
})
export class CinemaPage {
  movieId: number;
  title: string;
  showtimes: any = [];
  pageNum: number = 1;  // 当前获取的场次页数
  fourDate: any = [];
  todayDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController) {
    // 设置最远时间
    let tempDate = new Date();
    this.todayDate = (tempDate.getMonth()+1) + "月" + tempDate.getDate() + "日";
    this.fourDate.push(this.todayDate);
    for (let i = 0; i < 3; i++) {
      tempDate.setDate(tempDate.getDate() + 1);
      this.fourDate.push((tempDate.getMonth()+1) + "月" + tempDate.getDate() + "日");
    }

    // 获取信息
    this.movieId = this.navParams.get('movieId');
    this.title = this.navParams.get('movieTitle');
    // 显示 loading
    let loading = loadingCtrl.create({content: '正在加载...'});
    loading.present();
    this.theaterService.getShowtimes(this.movieId, this.pageNum).subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        for (let showtime of data.data) {
          // 不放入重复的影院
          for (let exist of this.showtimes)
            if (exist.cinema.name == showtime.cinema.name)
              continue;
          let parts = showtime.startTime.split(' ');
          showtime.startTime = parts[0] + ' ' + parts[1];
          this.showtimes.push(showtime);
        }
      } else {
        // TODO 异常处理，未取回场次数据
      }
    });
  }

  // 监控滚动，获取更多场次
  scroll(event: any) {
    let tracker = event.target;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.target.scrollTop === limit) {
      this.pageNum++;
      this.theaterService.getShowtimes(this.movieId, this.pageNum).subscribe((data) => {
        if (data.state == 'success') {
          this.showtimes = data.data;
        } else {
          // TODO 异常处理，未取回电影数据
        }
      });
    }
  }

  gotoShowtime(cinemaId) {
    this.navCtrl.push(ShowtimePage, {movieId: this.movieId, movieTitle: this.title, cinemaId: cinemaId});
  }

}
