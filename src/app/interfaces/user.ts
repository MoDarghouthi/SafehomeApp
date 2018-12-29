import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User {
    fullName: String,
    email: String,
    password: String,
    phone:String,
    sexe:String,
    stype:String,
    lat:String,
    lng:String,
    name_s:String,
    email_s:String,
    phone_s:String
}

Injectable()
export abstract class UserListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getApiUser(email,token):Observable <any>;
  abstract updateUser(data,email,token);
  abstract deleteUser(email,token);
}
