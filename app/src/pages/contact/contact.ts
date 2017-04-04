import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingPage }  from '../setting/setting';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  gotoSetting() {
    this.navCtrl.push(SettingPage);
  }
}
