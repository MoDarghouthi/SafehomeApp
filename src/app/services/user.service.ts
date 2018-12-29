import { Platform, AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User, UserListService } from '../interfaces/user'

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
var user: User ={
  fullName: '',
  email: '',
  password: '',
  phone:'',
  sexe:'',
  stype:'',
  lat:'',
  lng:'',
  name_s:'',
  email_s:'',
  phone_s:''
};

@Injectable()
export class UserService implements UserListService{

  constructor(private authService: AuthService, private http: HttpClient, private alertController: AlertController, 
    private helper: JwtHelperService, private storage: Storage) { }

getApiUser(email,token):Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.get(`${this.authService.url}/users/${email}`,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
 }

updateUser(data,email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.patch(`${this.authService.url}/users/${email}`,data,httpOptions).pipe(
    catchError(e => {

      throw new Error(e);
    })
  );
}

deleteUser(email,token){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer' + token
    })
  };
  return this.http.delete(`${this.authService.url}/users/${email}`,httpOptions).pipe(
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
