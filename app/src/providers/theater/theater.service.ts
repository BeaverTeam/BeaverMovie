import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Global } from '../global';

@Injectable()
export class TheaterService {
  private global = new Global();

  constructor(public http: Http) {}

  getMovies(page: number) {
    let options = new RequestOptions({withCredentials: true});
    return this.http.get(this.global.serverUrl + '/movie/lastest/' + page,
                         options)
                    .map(res => res.json());
  }

  // 根据电影名称获取电影的详情
  getMovie(movieId: number) {
    let options = new RequestOptions({withCredentials: true});
    return this.http.get(this.global.serverUrl + '/movie/' + movieId,
                         options)
                    .map(res => res.json());
  }

}
