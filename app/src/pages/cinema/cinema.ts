import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ShowtimePage } from '../showtime/showtime';
import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-cinema',
  templateUrl: 'cinema.html',
})
export class CinemaPage {
  movieId: number;
  title: string;
  showtimesByDay: any = [[], [], [], []];
  pageNum: number = 1;  // 当前获取的场次页数
  fourDate: any = [];
  todayDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, public appCtrl: App) {
    // 设置最远时间
    let tempDate = new Date();
    this.todayDate = (tempDate.getMonth() + 1) + "月" + tempDate.getDate() + "日";
    this.fourDate.push(this.todayDate);
    for (let i = 0; i < 3; i++) {
      tempDate.setDate(tempDate.getDate() + 1);
      this.fourDate.push((tempDate.getMonth() + 1) + "月" + tempDate.getDate() + "日");
    }

    // 获取信息
    this.movieId = this.navParams.get('movieId');
    this.title = this.navParams.get('movieTitle');
  }

  ionViewWillEnter() {
    this.showtimesByDay = [[], [], [], []];
    // 显示 loading
    let loading = this.loadingCtrl.create({content: '正在加载...'});
    loading.present();
    this.theaterService.getShowtimes(this.movieId).subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        // 给场次按时间顺序排序
        let tempShowtimes = data.data;
        tempShowtimes.sort(function(a, b) {
          let startTimeA = a.startTime.split(" ");
          let startDateA = new Date(startTimeA[0] + "T" + startTimeA[1] + ":00");
          let startTimeB = b.startTime.split(" ");
          let startDateB = new Date(startTimeB[0] + "T" + startTimeB[1] + ":00");
          if (startDateA > startDateB) return 1
          else if (startDateA < startDateB) return -1;
          else return 0;
        });
        // 装进不同的时间数组
        let tempShowtimesByDay = [[], [], [], []];
        for (let showtime of tempShowtimes) {
          let startTime = showtime.startTime.split(" ");
          let tempStartDate = startTime[0].split("-");
          let startDate = new Date(tempStartDate[0], parseInt(tempStartDate[1]) - 1, tempStartDate[2]);
          let now = new Date();
          let todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          let oneDay = 24 * 60 * 60 * 1000;
          let diffDays = Math.abs((startDate.getTime() - todayDate.getTime())/(oneDay));
          if (diffDays < 4)
            tempShowtimesByDay[diffDays].push(showtime);
        }
        // 去重
        for (let i = 0; i < 4; i++) {
          for (let showtime of tempShowtimesByDay[i]) {
            // 不放入重复的影院
            let flag = true;
            for (let exist of this.showtimesByDay[i]) {
              if (exist.cinema.id == showtime.cinema.id) {
                flag = false;
                break;
              }
            }
            if (!flag) continue;
            let parts = showtime.startTime.split(' ');
            showtime.startTime = parts[0] + ' ' + parts[1];
            this.showtimesByDay[i].push(showtime);
          }
        }
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

  gotoShowtime(cinemaId, cinemaName) {
    this.navCtrl.push(ShowtimePage, {movieId: this.movieId, cinemaName: cinemaName, cinemaId: cinemaId});
  }

}
