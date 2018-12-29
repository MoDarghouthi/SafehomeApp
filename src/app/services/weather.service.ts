import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather, WeatherListService } from '../interfaces/weather'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {LocationService} from './location.service'
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';






@Injectable()
export class WeatherService implements WeatherListService {
 
  weather_url = environment.weather_url;
  weather_api = environment.api_weather;
  
  constructor(private http: HttpClient, private locationService:LocationService) { }

  getWeather(location):Observable <any> {
      var final_url = this.weather_url + '?lat='+location.lat+'&lon='+location.lng+'&APPID='+this.weather_api+'&units=metric';
      return this.http.get(`${final_url}`).pipe(
        catchError(e => {
          throw new Error(e);
        })
      );
  }
}
