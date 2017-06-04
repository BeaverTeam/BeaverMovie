import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-webview',
  templateUrl: 'webview.html',
})
export class WebviewPage {
  iframe: any;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sanitizer: DomSanitizer) {
    this.name = this.navParams.get('name');
    this.iframe = sanitizer.bypassSecurityTrustResourceUrl('https://wapbaike.baidu.com/item/' + this.name);
  }

}
