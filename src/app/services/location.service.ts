import { Geolocation } from '@ionic-native/geolocation';
import { Platform, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Location, LocationListService } from '../interfaces/location'

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
var location: Location ={
  lat: '',
  lng: '',
  email: ''
};

@Injectable()
export class LocationService implements LocationListService{

  constructor(public geo: Geolocation, private authService: AuthService, private http: HttpClient, private alertController: AlertController, 
    private helper: JwtHelperService, private storage: Storage) { }

  getLocation(){
    var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    return this.geo.getCurrentPosition(options).then( pos => {
      var result ={"lat":pos.coords.latitude,"lng":pos.coords.longitude};
      return result;
    });
  }


getApiLocation(email,token):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.get(`${this.authService.url}/Locations/${email}`,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
 }

updateLocation(data,email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.patch(`${this.authService.url}/Locations/${email}`,data,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
}

deleteLocation(email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.delete(`${this.authService.url}/Locations/${email}`,httpOptions).pipe(
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
    alert.present()
  }

}
