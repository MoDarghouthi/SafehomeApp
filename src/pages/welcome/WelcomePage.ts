import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/services/auth.service';
import { SensorService } from '../../app/services/sensor.service';
import { Storage } from '@ionic/storage';
import { Subscription, Observable } from 'rxjs';
import { LocationService } from '../../app/services/location.service';
import { EmergencyService } from '../../app/services/emergency.service';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { MotionService } from '../../app/services/motion.service';
import { Network } from '@ionic-native/network';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, google } from './welcome';
@Component({
  selector: 'app-accountu',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss'],
})
export class WelcomePage implements OnInit {
  status: any = "Ok !";
  stat: any = "Ok";
  statusIcon: any = "assets/imgs/oki.png";
  user: any;
  token: any;
  temp: any = "Loading ...";
  Gas: any = "Loading ...";
  Motion;
  subscription: Subscription;
  subscriptionn: Subscription;
  disconnectSubscription: any;
  sub: any;
  /* weather:Weather={
     city:'',
     lastUp:'',
     description:'Loading ...',
     humidity:'',
     temperature:'',
     sunSet:'',
     sunRise:'',
     icon:''
   };
 */
  constructor(private motionService: MotionService, private alertController: AlertController, private navContrl: NavController, private emergencyService: EmergencyService, private locationService: LocationService, private authService: AuthService, private sensorService: SensorService, private storage: Storage, private network: Network, private toastCtrl: ToastController) { }
  ngOnInit() {
    this.verifyConnection();
    const sourcee = Observable.interval(3599000);
    this.subscriptionn = sourcee.subscribe(val => {
      this.storage.get(REFRESH_TOKEN_KEY).then(tokeni => {
        this.storage.get(TOKEN_KEY).then(tokenn => {
          this.authService.updateToken("auth", tokeni, tokenn).subscribe(resp => {
            this.storage.set(TOKEN_KEY, resp["access_token"]);
          });
        });
      });
    });
    this.watchStability();
    if (!this.token) {
      this.storage.get("access_token").then(tokenn => {
        this.token = tokenn;
        if (!this.user) {
          this.storage.get("User").then(userr => {
            this.user = userr;
            this.getSensorData();
            /*this.getWeather();
            this.startNavigating();*/
            const source = Observable.interval(10000);
            this.subscription = source.subscribe(val => {
              if (this.motionService.alert) {
                this.statusIcon = "assets/imgs/alert.png";
                this.status = "ALERT !";
                this.stat = "ALERTS";
              }
              this.getSensorData();
              this.startNavigating();
            });
          });
        }
      });
    }
  }
  getSensorData() {
    this.sensorService.getApiSensor(this.user.email, this.token).subscribe(res => {
      this.Gas = res[0].Gas;
      this.temp = res[0].temperature;
      this.Motion = res[0].Motion;
    });
  }
  presentToast(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
  verifyConnection() {
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast("Please turn on your connection !");
    });
  }
  watchStability() {
    this.sub = this.motionService.getMotion();
    if (this.motionService.alert) {
      this.statusIcon = "assets/imgs/alert.png";
      this.status = "ALERT !";
    }
  }
  startNavigating() {
    let directionsService = new google.maps.DirectionsService;
    this.storage.get("User").then(user => {
      this.locationService.getLocation().then(pos => {
        directionsService.route({
          origin: { lat: pos.lat, lng: pos.lng },
          destination: { lat: Number(user.lat), lng: Number(user.lng) },
          travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            this.storage.set("distance_m", res.routes[0].legs[0].distance.value);
          }
          else {
            console.warn(status);
          }
        });
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }
  logout() {
    this.authService.logout();
  }
  /* getWeather(){
   this.locationService.getLocation().then(loc=>{
     this.weatherService.getWeather(loc).subscribe(resp=>{
       this.weather.city ='You are at ' + resp.name + ', ' + resp.sys.country;
       this.weather.description = resp.weather[0].description;
       this.weather.icon ='http://openweathermap.org/img/w/'+resp.weather[0].icon+'.png';
       this.weather.humidity = resp.main.humidity + ' %';
       this.weather.temperature = resp.main.temp + ' °C';
       var datePipe = new DatePipe("en-US");
       this.weather.sunRise = datePipe.transform((resp.sys.sunrise*1000),"hh:mm a");
       this.weather.sunSet = datePipe.transform((resp.sys.sunset*1000),"hh:mm a");
       var today= new Date();
       this.weather.lastUp=formatDate(today, 'dd-MM-yyyy hh:mm a', 'en-US');
     });
   });
 }*/
  /*openWeather(){
    this.navContrl.navigateRoot('/tabs/(weather:weather)');
  }*/
  async AlertChangeStatutsOk() {
    const alert = await this.alertController.create({
      title: 'Modify User',
      message: 'Are you sure about decline the alert !',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'OK',
          handler: (data) => {
            this.storage.get("access_token").then(tokenn => {
              this.token = tokenn;
              this.storage.get("User").then(userr => {
                this.emergencyService.updateEmergency({ "status": "OK" }, this.user.email, this.token).subscribe();
                this.statusIcon = "assets/imgs/oki.png";
                this.status = "Ok !";
                this.stat = "OK";
                this.motionService.alert = false;
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async AlertChangeStatuts() {
    const alert = await this.alertController.create({
      title: 'Modify User',
      message: 'Are you sure about sending to supervisor help request !',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'OK',
          handler: (data) => {
            this.storage.get("access_token").then(tokenn => {
              this.token = tokenn;
              this.storage.get("User").then(userr => {
                this.emergencyService.updateEmergency({ "status": "ALERTN" }, this.user.email, this.token).subscribe();
                this.statusIcon = "assets/imgs/alert.png";
                this.status = "ALERT !";
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
