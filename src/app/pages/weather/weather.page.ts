import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  weather: any;
  city: any;
  icon = "";
  minTemp: any;
  maxTemp: any;
  currentLocation: any;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  constructor(private apiService: ApiService,
    private photoViewer: PhotoViewer,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private platform: Platform
    ) { }

    ionViewWillEnter(){
      this.weather='';
      this.city='';
      this.icon='';
      this.minTemp='';
      this.maxTemp='';
      this.currentLocation='';
    }

  ngOnInit() { }

  async getCurrentWeather() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
      duration: 2000,
    });
    loading.present();
    if (this.city != '') {
      this.apiService.getCityWeather(this.city).subscribe((response) => {
        console.log(response.cod);
        if (response.cod == '200') {
          this.weather = response.weather;
          this.minTemp = response.main.temp_max;
          this.maxTemp = response.main.temp_min;
          this.icon = this.apiService.IMAGE_URL;
          // this.icon = this.apiService.IMAGE_URL + this.weather[0].icon
          console.log('data: ', this.weather, this.minTemp, this.maxTemp);
          loading.dismiss();
        } else {
          console.log('erro', response.message);
          this.presentToast(response.message);
          loading.dismiss();
        }
      });
    } else {
      this.presentToast('Please enter city name');
      loading.dismiss();

    }

  }

  showImage() {
    this.photoViewer.show('http://my_site.com/my_image.jpg', 'Optional Title');
  }

  async presentToast(msg: any) {

    console.log('msg: ', msg);

    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }


  getCurrentCoordinates() {
    if (this.platform.is('android')) {

    this.geolocation.getCurrentPosition().then((resp) => {

      this.currentLocation =resp;
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }else{
    this.apiService.presentToastError('Your are not mobile platform')
  }
}
  
}
