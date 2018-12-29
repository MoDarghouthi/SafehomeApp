import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Location {
    lat: string;
    lng: string;
    email: string;
}

Injectable()
export abstract class LocationListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getApiLocation(email,token):Observable <any>;
  abstract updateLocation(data,email,token);
  abstract deleteLocation(email,token);
}
