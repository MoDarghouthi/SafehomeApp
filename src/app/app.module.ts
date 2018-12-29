import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login'; 
import {SignUpPage} from '../pages/sign-up/sign-up';
import { WelcomePage } from "../pages/welcome/WelcomePage";
import{AuthProvider} from '../Providers/AuthentificationProvider/AuthentificationProvider';
import { HttpModule } from '@angular/http';
import { SensorProvider } from '../providers/sensor/sensor';


import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LocationService } from './services/location.service';
import { SensorService } from './services/sensor.service';
import { EmergencyService } from './services/emergency.service';
import { SupervisorService } from './services/supervisor.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { WeatherService } from './services/weather.service';
import { DeviceMotion } from '@ionic-native/device-motion';
import { MotionService } from './services/motion.service';
import { Network } from '@ionic-native/network';
@NgModule({
  declarations: [
    
    MyApp,
    HomePage,
    SignUpPage,
    WelcomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    WelcomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    MotionService,
    DeviceMotion,
    LocationService,
    AuthGuardService,
    AuthService,
    UserService,
    SupervisorService,
    SensorService,
    EmergencyService,
    WeatherService
  ],
 
})
export class AppModule {}
