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
      console.log(data);
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

  changeSeatFormat(seat) {
    // TODO 将座位号从 int 类型转变成为字符串
    return "1排1号";
  }

}
