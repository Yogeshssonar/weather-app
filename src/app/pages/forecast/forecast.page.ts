import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
})
export class ForecastPage implements OnInit {

  forecast: any;
  currentWeather: any;
  city: any;
  icon ="" ;
  minTemp:any;
  maxTemp:any;
  constructor(private apiService: ApiService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController) {}

  ngOnInit() {}

  ionViewWillEnter(){
    this.forecast ='';
    this.currentWeather ='';
    this.city ='';
    this.icon ='';
    this.minTemp ='';    
    this.maxTemp ='';  
  }

 async getCurrentWeather() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
      duration: 2000,
    });
    loading.present();
    if(this.city !=''){
    this.apiService.getCityForecast(this.city).subscribe((response) => {
      console.log(response.cod);
      if (response.cod == '200') {
        this.currentWeather = response.city
        this.forecast =response.list;   
        loading.dismiss();
     
        console.log('data: ', this.currentWeather);
      } else {
        console.log('erro', response.message);
        this.apiService.presentToastError(response.message);
        loading.dismiss();

      }
    });
  }else{    
    this.apiService.presentToastError('Please enter city name');
    loading.dismiss();

    }

  }

 

}
