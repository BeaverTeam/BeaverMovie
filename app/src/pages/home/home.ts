import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MovieDetailPage } from '../movie-detail/movie-detail';
import { BuyTicketPage } from '../buy-ticket/buy-ticket';
import { NotePage } from '../note/note';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: any = [];
  noteNum: string;

  constructor(public navCtrl: NavController, public theaterService: TheaterService) {
    this.movies = this.theaterService.getMovies();

    // 将评分转换成星星
    for (let movie of this.movies) {
      let stars: any[] = [0, 0, 0, 0, 0];
      // 计算全星星的数目
      stars = Array(Math.floor(Math.round(movie.rating.average) / 2)).fill(2);
      // 计算半星星的数目
      if (Math.round(movie.rating.average) % 2) stars.push(1);
      // 补空星星
      while (stars.length < 5) stars.push(0);
      movie.stars = stars;
    }
    this.noteNum = "5";
  }

  // 前往消息中心
  gotoNotes() {
    this.navCtrl.push(NotePage);
  }

  // 前往电影详情页面
  gotoDetail(index) {
    this.navCtrl.push(MovieDetailPage, {movieName: this.movies[index].title});
  }

  // 前往购票页面
  buyTicket(index) {
    this.navCtrl.push(BuyTicketPage, {movieName: this.movies[index].title});
  }

}
