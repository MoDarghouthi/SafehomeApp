import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Sensor {
    email: String,
    humidity:String,
    temperature:String,
    current:String,
    voltage:String,
    battery_mah:String,
    max_v:String,
    min_v:String
}

Injectable()
export abstract class SensorListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getApiSensor(email,token):Observable <any>;
  abstract updateSensor(data,email,token);
  abstract deleteSensor(email,token);
}
