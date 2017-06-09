import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  tickets: any = [];
  colors: any = ['rgb(33, 68, 89)', 'rgb(25, 98, 115)', 'rgb(115, 1, 88)', 'rgb(154, 0, 68)'];
  futureTickets: any = [];
  pageNum: number = 1;
  type: string = 'type1';
  seatsInfo = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public loadingCtrl: LoadingController) {
    // 显示 loading
    let loading = loadingCtrl.create({content: '正在加载...'});
    loading.present();
    if (navParams.get("tickets") != undefined && navParams.get("tickets") != null) {
      this.type = navParams.get("tickets");
    }
    theaterService.getPaidOrder().subscribe((data) => {
      loading.dismiss();
      if (data.state == 'success') {
        for (let order of data.data) {
          if (order.paid) {
            for (let tempTicket of order.tickets) {
              let startTime = tempTicket.showtime.startTime.split(' ');
              let startDate = new Date(startTime[0] + "T" + startTime[1] + ":00");
              if (startDate > new Date()) {
                this.futureTickets.push(tempTicket);
              } else {
                this.tickets.push(tempTicket);
              }
            }
          }
        }

      } else {
        // TODO 异常处理
      }
    });
  }

  getColor(i) {
    let num = i % 4;
    return this.colors[num];
  }

  changeTimeFormat(time) {
    let tempTime = time.split(' ');
    return tempTime[0] + " " + tempTime[1];
  }

  // 将座位号从 int 类型转变成为字符串
  changeSeatFormat(seat) {
    let count = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.seatsInfo[i][j] != -1) {
          if (seat == count) return (i + 1) + ' 排 ' + (j + 1) + ' 列';
          count++;
        }
      }
    }
  }

}
