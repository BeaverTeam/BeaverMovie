import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myMovies : any = []
  constructor(public navCtrl: NavController) {
    var request = new XMLHttpRequest();
    request.open('GET', '../../assets/data/data.json', false);
    request.send(null)
    this.myMovies = JSON.parse(request.responseText);
  }

  gotoNotes() {

  }

}
