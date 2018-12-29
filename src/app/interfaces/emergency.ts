import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Emergency {
    status: string;
    email: string;
}


Injectable()
export abstract class EmergencyListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getApiEmergency(email,token):Observable <any>;
  abstract updateEmergency(data,email,token);
  abstract deleteEmergency(email,token);
}
