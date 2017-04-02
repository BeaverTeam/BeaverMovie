import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  num: Number;
  tab1Root: any = HomePage;
  tab2Root: any = ContactPage;

  constructor() {}
}
