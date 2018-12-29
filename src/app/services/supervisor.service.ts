import { Platform, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Supervisor, SupervisorListService } from '../interfaces/supervisor'

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
var supervisor: Supervisor ={
  fullName: '',
  email: '',
  password: '',
  phone:'',
  stype:'',
  name_u:'',
  email_u:'',
  phone_u:''
};

@Injectable()
export class SupervisorService implements SupervisorListService{

  constructor(private authService: AuthService, private http: HttpClient, private alertController: AlertController, 
    private helper: JwtHelperService, private storage: Storage) { }

getApiSupervisor(email,token):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.get(`${this.authService.url}/supers/${email}`,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
 }

updateSupervisor(data,email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.patch(`${this.authService.url}/supers/${email}`,data,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
}

deleteSupervisor(email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.delete(`${this.authService.url}/supers/${email}`,httpOptions).pipe(
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
