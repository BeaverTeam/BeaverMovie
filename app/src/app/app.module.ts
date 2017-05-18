import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { ContactPage } from '../pages/contact/contact';
import { HistoryPage } from '../pages//history/history';
import { RecommendPage } from '../pages/recommend/recommend';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth/auth.service';
import { TheaterService } from '../providers/theater/theater.service';
import { UserService } from '../providers/user/user.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    MovieDetailPage,
    RecommendPage,
    HistoryPage,
    ContactPage,
    SettingPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    MovieDetailPage,
    RecommendPage,
    HistoryPage,
    ContactPage,
    SettingPage,
    TabsPage
  ],
  providers: [
    AuthService,
    TheaterService,
    UserService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
