import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friends: any = [{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "刘忍"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "南瓜"},{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "粥"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "鲜虾"},{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "刘忍"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "拉肠"},{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "水煮"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "酸菜"},{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "刘忍"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "爆炒"},{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "蒜香"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "刘忍"},{avatar: "http://img.hb.aicdn.com/588c2316a7ffd24bff10730774c2ec0e46c0d371c54-UECu0C_fw658", name: "拔丝"}, {avatar: "http://img.hb.aicdn.com/68868b438c11b5d7d91b3250f469dabd7fce07b31ff2-mcfCdK_fw658", name: "刘忍"}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
