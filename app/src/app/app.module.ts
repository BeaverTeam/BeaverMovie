import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { HistoryPage } from '../pages//history/history';
import { RecommendPage } from '../pages/recommend/recommend';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth/auth.service';
import { Theater } from '../providers/theater/theater.service';
import { User } from '../providers/user/user.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RecommendPage,
    HistoryPage,
    ContactPage,
    SettingPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RecommendPage,
    HistoryPage,
    ContactPage,
    SettingPage,
    TabsPage
  ],
  providers: [
    AuthService,
    Theater,
    User,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
