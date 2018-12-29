import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Supervisor {
    fullName: String,
    email: String,
    password: String,
    phone:String,
    stype:String,
    name_u:String,
    email_u:String,
    phone_u:String
}

Injectable()
export abstract class SupervisorListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getApiSupervisor(email,token):Observable <any>;
  abstract updateSupervisor(data,email,token);
  abstract deleteSupervisor(email,token);
}
