import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { HistoryPage } from '../history/history';
import { RecommendPage } from '../recommend/recommend';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = RecommendPage;
  tab3Root: any = HistoryPage;
  tab4Root: any = ContactPage;

  constructor() {}
}
