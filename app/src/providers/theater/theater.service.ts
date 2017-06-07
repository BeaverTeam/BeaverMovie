import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Global } from '../global';

@Injectable()
export class TheaterService {
  private global = new Global();
  options: any = new RequestOptions({withCredentials: true});

  constructor(public http: Http) {}

  // 获取电影信息
  getMovies(page: number) {
    return this.http.get(this.global.serverUrl + '/movie/lastest/' + page,
                         this.options)
                    .map(res => res.json());
  }

  // 根据电影 id 获取电影的详情
  getMovie(movieId: number) {
    return this.http.get(this.global.serverUrl + '/movie/' + movieId,
                         this.options)
                    .map(res => res.json());
  }

  // 根据电影 id 获取场次信息
  getShowtimes(movieId: number, page: number) {
    return this.http.get(this.global.serverUrl + '/movie/' + movieId + '/showtimes/' + page,
                         this.options)
                    .map(res => res.json());
  }

  // 根据影院 id 获取场次信息
  getCinemaShowtimes(cinemaId: number) {
    return this.http.get(this.global.serverUrl + '/cinema/' + cinemaId + '/showtimes/',
                         this.options)
                    .map(res => res.json());
  }

  // 获取影院的座位
  getSeats(showtimeId: number) {
    return this.http.get(this.global.serverUrl + '/showtime/' + showtimeId + '/unavailableSeats',
                         this.options)
                    .map(res => res.json());
  }

  // 发送订单
  sendOrder(showtimeId: number, seats: number[]) {
    return this.http.post(this.global.serverUrl + '/order',
                          {showtimeId: showtimeId,
                           seats: seats},
                          this.options)
                    .map(res => res.json());
  }

}
