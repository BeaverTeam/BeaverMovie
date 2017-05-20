import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';

@Injectable()
export class TheaterService {
  // private headers = new Headers({'Content-Type': 'application/json'});

  constructor() {}

  getMovies() {
    // 暂时从文件中获取电影信息
    var request = new XMLHttpRequest();
    request.open('GET', '../../assets/data/in-theaters.json', false);
    request.send(null);
    return JSON.parse(request.responseText).subjects;
  }

  // 根据电影名称获取电影的详情
  getMovie(movieName) {
    var request = new XMLHttpRequest();
    request.open('GET', '../../assets/data/in-theaters.json', false);
    request.send(null);
    var movies = JSON.parse(request.responseText).subjects;
    for (var i = 0; i < movies.length; i++) {
      if (movies[i].title == movieName)
        return movies[i];
    }
    return false;
  }

}
