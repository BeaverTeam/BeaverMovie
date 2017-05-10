import { Injectable } from '@angular/core';

@Injectable()
export class TheaterService {

  constructor() {}

  getMovies() {
    // 暂时从文件中获取电影信息
    var request = new XMLHttpRequest();
    request.open('GET', '../../assets/data/in-theaters.json', false);
    request.send(null);
    return JSON.parse(request.responseText).subjects;
  }

}
