import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';

import { MovieDetailPage } from '../movie-detail/movie-detail';
import { CinemaPage } from '../cinema/cinema';
import { NotificationPage } from '../notification/notification';
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { TheaterService } from '../../providers/theater/theater.service';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any = [];
  pageNum: number = 1;  // 当前获取的电影页数
  notifNum: number;

  constructor(public navCtrl: NavController, public theaterService: TheaterService,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController,
              private userService: UserService, public appCtrl: App) {}

  ionViewWillEnter() {
    this.pageNum = 1;
    // 显示 loading
    let loading = this.loadingCtrl.create({content: '正在加载...'});
    loading.present();
    this.theaterService.getMovies(this.pageNum).subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        this.movies = data.data;
        // 将评分转换成星星
        for (let movie of this.movies) {
          let stars: any[] = [0, 0, 0, 0, 0];
          // 计算全星星的数目
          stars = Array(Math.floor(Math.round(movie.rating) / 2)).fill(2);
          // 计算半星星的数目
          if (Math.round(movie.rating) % 2) stars.push(1);
          // 补空星星
          while (stars.length < 5) stars.push(0);
          movie.stars = stars;
        }
      } else {
        if (data.message == '未登录')
          this.appCtrl.getRootNav().push(LoginPage);
        else
          this.presentToast(data.message);
      }
    });
    // 计算通知数目
    let that = this;
    this.userService.getFriendRequests().subscribe((data) => {
      if (data.state == 'success') {
        let postAndHandled = data.data.PostAndHandled;
        let receivedNotHandled = data.data.ReceivedNotHandled;
        that.notifNum = postAndHandled.length + receivedNotHandled.length;
        this.userService.getInvitationInfo().subscribe((data_) => {
          if (data_.state == 'success') {
            let postAndHandled = data_.data.PostAndHandled;
            let receivedNotHandled = data_.data.ReceivedNotHandled;
            that.notifNum += (postAndHandled.length + receivedNotHandled.length);
          } else {
            this.presentToast(data_.message);
          }
       });
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

  // 前往消息中心
  gotoNotifications() {
    this.navCtrl.push(NotificationPage);
  }

  // 前往电影详情页面
  gotoDetail(index) {
    this.navCtrl.push(MovieDetailPage, {movieId: this.movies[index].id});
  }

  // 前往购票页面
  buyTicket(index) {
    this.navCtrl.push(CinemaPage, {movieId: this.movies[index].id,
                                     movieTitle: this.movies[index].title});
  }

  // 监控滚动，获取更多电影
  scroll(event: any) {
    let tracker = event.target;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.target.scrollTop === limit) {
      this.pageNum++;
      this.theaterService.getMovies(this.pageNum).subscribe((data) => {
        if (data.state == 'success') {
          // 将评分转换成星星
          for (let movie of data.data) {
            let stars: any[] = [0, 0, 0, 0, 0];
            // 计算全星星的数目
            stars = Array(Math.floor(Math.round(movie.rating) / 2)).fill(2);
            // 计算半星星的数目
            if (Math.round(movie.rating) % 2) stars.push(1);
            // 补空星星
            while (stars.length < 5) stars.push(0);
            movie.stars = stars;
            this.movies.push(movie);
          }
        } else {
          if (data.message == '未登录')
            this.appCtrl.getRootNav().push(LoginPage);
          else
            this.presentToast(data.message);
        }
      });
    }
  }

  // 跳转到 search 页面
  gotoSearch() {
    this.navCtrl.push(SearchPage);
  }

}
