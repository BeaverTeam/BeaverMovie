import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Global } from '../global';

@Injectable()
export class TheaterService {
  private global = new Global();
  options: any = new RequestOptions({withCredentials: true});
  articles: any = [
    {
      title: "神奇女侠",
      imgUrl: "assets/images/movie-0.webp",
      label: "影评",
      summary: "黛安娜，你不仅拯救世界，也拯救了DCEU！你们有些人是被漫威电影看傻了吧？吐槽语言的，雷神为什么讲英语？银护全宇宙通用英语吗？说剧情幼稚的，比跳尴尬舞还幼稚？一神持一盾为什么不能吸引火力？"
    }, {
      title: "本尼迪克特·康伯巴奇",
      imgUrl: "assets/images/movie-1.webp",
      label: "人物",
      summary: "本尼迪克特·康伯巴奇（Benedict Cumberbatch），1976年7月19日出生于英国伦敦，英国演员、制片人。 2000年，本尼迪克特出演电视剧《心跳》，开始演艺生涯。"
    }, {
      title: "加勒比海盗5：死无对证",
      imgUrl: "assets/images/movie-2.webp",
      label: "影评",
      summary: "作为加勒比海盗的脑残粉必须打满分，能在有生之年看到黑珍珠号重返大海真是鸡冻人心，整体来说第五部比第四部好很多，不过剧本确实一般。"
    }, {
      title: "似是故人来",
      imgUrl: "assets/images/movie-3.webp",
      label: "台词",
      summary: "我听别人说这世界上有一种鸟是没有脚的，它只能够一直的飞呀飞呀，飞累了就在风里面睡觉，这种鸟一辈子只能下地一次，那一次就是它死亡的时候。"
    }, {
      title: "摔跤吧！爸爸",
      imgUrl: "assets/images/movie-4.webp",
      label: "影评",
      summary: "关于本片价值观－不看社会背景就评判三观就是耍流氓。在印度的社会状况下，女性是没有自由选择职业的氛围的，先破才能立。这场斗争的意义早已超脱出父亲一己的梦想，升华了呀。"
    }, {
      title: "哆啦A梦：大雄的南极冰冰凉大冒险",
      imgUrl: "assets/images/movie-5.webp",
      label: "影评",
      summary: "每年一部的剧场版还真的不能看，就跟10年前第一次看《哆啦A梦》剧场版一样，粗糙消费情怀，前年的《伴我同行》都要好看一万倍。"
    }, {
      title: "迷失Z城",
      imgUrl: "assets/images/movie-6.webp",
      label: "影评",
      summary: "美轮美奂, 有几场戏好像幻境, 从战场穿越到丛林, 像梦一样开枝散叶, 有点《蛇之拥抱》的错觉。老派的故事和画面真是让沉迷古典的人欲罢不能。"
    }];

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
  getShowtimes(movieId: number) {
    return this.http.get(this.global.serverUrl + '/movie/' + movieId + '/showtimes/',
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

  // 获取推荐信息
  getRecommendMovies() {
    return this.articles;
  }

  // 完成付款
  makePayment(orderId) {
    return this.http.get(this.global.serverUrl + '/order/pay/' + orderId,
                          this.options)
                    .map(res => res.json());
  }

  // 获取待使用的票券
  getPaidOrder() {
    return this.http.get(this.global.serverUrl + '/order',
                          this.options)
                    .map(res => res.json());
  }

  // 根据 showtimeId 获取场次信息
  getShowtime(showtimeId: number) {
    return this.http.get(this.global.serverUrl + '/showtime/' + showtimeId,
                          this.options)
                    .map(res => res.json());
  }

}
