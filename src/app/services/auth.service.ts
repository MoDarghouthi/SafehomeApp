import { Platform, AlertController, NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import{LoginPage} from '../../pages/login/login'
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
 
@Injectable()
export class AuthService {
 
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  accountType = new BehaviorSubject(false);
 
  constructor(
    private http: HttpClient, 
    private helper: JwtHelperService, 
    private storage: Storage,
    private plt: Platform, 
    private alertController: AlertController,
    private navcrtl: NavController
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  //Verify Token
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
          if(this.user.stype === "Supervisor"){
            this.accountType.next(true);
          }
        } else {
          this.storage.remove(TOKEN_KEY);
          this.storage.remove(REFRESH_TOKEN_KEY);
        }
      }
    });
  }

    //Verify Token
    updateToken(adress,tokeni,tokenn) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer' + tokenn
          })
        };
          var data ={"refresh_token":tokeni};
          return this.http.post(`${this.url}/${adress}/refresh`, data, httpOptions).pipe(
            catchError(e => {
              throw new Error(e);
            })
          );
    }


 //register User
  register(credentials) {
    return this.http.post(`${this.url}/users`, credentials).pipe(
      catchError(e => {
        throw new Error(e);
      })
    );
  }

/*
 //register Supervisor
  registerS(credentials) {
    return this.http.post(`${this.url}/supers`, credentials).pipe(
      catchError(e => {
        throw new Error(e);
      })
    );
  }
*/
//register locations
  registerL(credentials) {
    return this.http.post(`${this.url}/Locations`, credentials).pipe(
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  //register emergencys
  registerE(credentials) {
    return this.http.post(`${this.url}/Emergencys`, credentials).pipe(
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  //register sensors
  registerSe(credentials) {
    return this.http.post(`${this.url}/Sensors`, credentials).pipe(
      catchError(e => {
        throw new Error(e);
      })
    );
  }

//login User
  login(credentials) {
    return this.http.post(`${this.url}/auth`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['accessToken']);
          this.storage.set(REFRESH_TOKEN_KEY, res['refreshToken']);
          this.storage.set("motion",{"x":"9.0","y":"0.0","z":"5.0"});
          this.user = this.helper.decodeToken(res['accessToken']);
          this.storage.set("User",  this.user);
          this.authenticationState.next(true);
          this.accountType.next(false);
        }),
        catchError(e => {
          this.showAlert(e.error.error);
          throw new Error(e);
        })
      );
  }

 //login Supervisor
  /* loginS(credentials) {
    return this.http.post(`${this.url}/auths`, credentials)
     .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['accessToken']);
          this.storage.set(REFRESH_TOKEN_KEY, res['refreshToken']);
          this.user = this.helper.decodeToken(res['accessToken']);
          this.storage.set("User",  this.user);
          this.authenticationState.next(true);
          this.accountType.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.error);
          throw new Error(e);
        })
      );
  }*/

//logout All users type
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(REFRESH_TOKEN_KEY);
      this.authenticationState.next(false);
      this.navcrtl.push('LoginPage');
    });
  }
 
  //verify session 
  isAuthenticated() {
    return this.authenticationState.value;
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