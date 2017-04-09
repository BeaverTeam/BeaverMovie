import { Injectable } from '@angular/core';

@Injectable()
export class TheaterService {

  constructor() {}

  getMovies() {
    var request = new XMLHttpRequest();
    request.open('GET', '../../assets/data/movies.json', false);
    request.send(null);
    return JSON.parse(request.responseText);
  }

}
