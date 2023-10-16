import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL_WEATHER:any = '';
  // API_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
  API_URL_FORCAST = 'https://api.openweathermap.org/data/2.5/weather';
  API_KEY = '748c00616cee0c0fd25576016ba185b8';
  IMAGE_URL = 'https://openweathermap.org/img/w/'
  url: any;
  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private alertController: AlertController
  ) {
    this.API_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=';
    this.API_URL_FORCAST = 'https://api.openweathermap.org/data/2.5/forecast?q='
  }
  
/**
 * 
 * @param msg toast message service
 */
  async presentToastError(msg: any) {
    console.log('toast', msg);

    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: 'light',
    });
    toast.present();
  }

/***
 * get weather 
 */
  getCityWeather(city: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL_WEATHER}${city}` + '&appid=' + this.API_KEY);
  }

/***
 * get weather 
 */
  getCityForecast(city: any): Observable<any> {
    return this.http.get<any>(`${this.API_URL_FORCAST}${city}` + '&appid=' + this.API_KEY);
  }

  /**
   * Token set in Header
   */
  getHeader() {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // appid: '748c00616cee0c0fd25576016ba185b8',
      }),
    };
    return headers;
  }
}
