import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Theater } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies : any = []
  constructor(public navCtrl: NavController, public theater: Theater) {
    this.movies = theater.getMovies();
  }

  gotoNotes() {

  }

}
