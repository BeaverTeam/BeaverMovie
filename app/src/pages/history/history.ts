import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  movies: any = [];
  futureMovies: any = [];
  pageNum: number = 1;
  tickets: string = 'type1';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService) {
    theaterService.getMovies(this.pageNum).subscribe((data) => {
      if (data.state == 'success') {
        this.movies = data.data;
        this.futureMovies = this.movies.splice(3, 2);
      } else {
        // TODO 异常处理
      }
    });
  }

}
