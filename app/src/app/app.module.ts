import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { ProfilePage } from '../pages/profile/profile';
import { HistoryPage } from '../pages//history/history';
import { RecommendPage } from '../pages/recommend/recommend';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';
import { ShowtimePage } from '../pages/showtime/showtime';
import { NotificationPage } from '../pages/notification/notification';
import { WebviewPage } from '../pages/webview/webview';
import { CinemaPage } from '../pages/cinema/cinema';
import { ShowseatPage } from '../pages/showseat/showseat';

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
    ProfilePage,
    SettingPage,
    TabsPage,
    ShowtimePage,
    NotificationPage,
    WebviewPage,
    CinemaPage,
    ShowseatPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
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
    ProfilePage,
    SettingPage,
    TabsPage,
    ShowtimePage,
    NotificationPage,
    WebviewPage,
    CinemaPage,
    ShowseatPage
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
