import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  pageNum: number = 1;  // 当前获取的电影页数
  showtimes: any = [];  // 电影场次
  movies: any = [];  // 出现过的电影
  position: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private theaterService: TheaterService) {
    // 获取信息
    this.movieId = this.navParams.get('movieId');
    this.cinemaName = this.navParams.get('cinemaName');
    this.cinemaId = this.navParams.get('cinemaId');
    // 请求场次信息
    this.theaterService.getCinemaShowtimes(this.cinemaId, this.pageNum).subscribe((data) => {
      if (data.state == 'success') {
        let counter = 0;
        for (let showtime of data.data) {
          if (showtime.movie.id == this.movieId)
            this.position = counter;
          showtime.preciseTime = showtime.startTime.split(' ')[1];
          showtime.date = showtime.startTime.split(' ')[0];
          this.showtimes.push(showtime);
          // 计算出现过的电影
          for (let movie of this.movies)
            if (movie.id == showtime.movie.id)
              continue;
          this.movies.push(showtime.movie);
          counter++;
        }
        // 设置初始位置
        let interval = setInterval(() => {
          let movies = document.getElementById('movies');
          if (movies) {
            movies.style.left = '-' + this.position + '00%';
            clearInterval(interval);
          }
        }, 100);
      } else {
        // TODO 异常处理，未取回场次信息
      }
    });
  }

  changeFilm(direction: boolean) {
    let movies = document.getElementById('movies');
    if (direction)
      this.position++;
    else
      this.position--;
    movies.style.left = '-' + this.position + '00%';
  }

  // 监控滚动，获取更多电影
  scroll(event: any) {
    let tracker = event.target;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.target.scrollTop === limit) {
      this.pageNum++;
      // 请求场次信息
      this.theaterService.getCinemaShowtimes(this.cinemaId, this.pageNum).subscribe((data) => {
        if (data.state == 'success') {
          for (let showtime of data.data) {
            showtime.preciseTime = showtime.startTime.split(' ')[1];
            showtime.date = showtime.startTime.split(' ')[0];
            this.showtimes.push(showtime);
            // 计算出现过的电影
            for (let movie of this.movies)
              if (movie.id == showtime.movie.id)
                continue;
            this.movies.push(showtime.movie);
          }
        } else {
          // TODO 异常处理，未取回场次信息
        }
      });
    }
  }

}
