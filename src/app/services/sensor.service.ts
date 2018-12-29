import { Platform, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {Sensor, SensorListService } from '../interfaces/sensor';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
/*var sensor: Sensor ={
  email: '',
  humidity:'',
  temperature:'',
  current:'',
  voltage:'',
  battery_mah:'',
  max_v:'',
  min_v:''
};*/

@Injectable()
export class SensorService implements SensorListService{

  constructor(private authService: AuthService, private http: HttpClient, private alertController: AlertController, 
    private helper: JwtHelperService, private storage: Storage) { }


getApiSensor(email,token):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.get(`${this.authService.url}/Sensors/${email}`,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
 }

updateSensor(data,email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.patch(`${this.authService.url}/Sensors/${email}`,data,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
}

deleteSensor(email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.delete(`${this.authService.url}/Sensors/${email}`,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
}

  //show alert
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      title: 'Error',
      buttons: ['OK']
    });
   alert.present();
  }

}

