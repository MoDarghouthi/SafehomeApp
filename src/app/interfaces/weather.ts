import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Weather {
    city:String;
    lastUp:String;
    description:String;
    humidity:String;
    temperature:String;
    sunSet:String;
    sunRise:String;
    icon:String;
}

Injectable()
export abstract class WeatherListService {
  /**
   * Returns a list of all of the current user's todos.
   */
  
  abstract getWeather(location):Observable <any>;
}
