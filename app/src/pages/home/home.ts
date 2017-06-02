import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { MovieDetailPage } from '../movie-detail/movie-detail';
import { ShowtimePage } from '../showtime/showtime';
import { NotificationPage } from '../notification/notification';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any = [];
  pageNum: number = 1;  // 当前获取的电影页数
  notifNum: string;

  constructor(public navCtrl: NavController, public theaterService: TheaterService,
              public loadingCtrl: LoadingController) {
    this.notifNum = "5";
    // 显示 loading
    let loading = loadingCtrl.create({content: '正在加载...'});
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
        // TODO 异常处理，未取回电影数据
      }
    });
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
    this.navCtrl.push(ShowtimePage, {movieId: this.movies[index].id,
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
          // TODO 异常处理，未取回电影数据
        }
      });
    }
  }

}
