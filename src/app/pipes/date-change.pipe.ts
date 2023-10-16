import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'dateChange'
})
export class DateChangePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    let d = new Date(date * 1000)
    // this.minTemp =  this.forecast[0].dt * 1000;

    // this.minTemp = 1697452640 * 1000;

    // var todate=new Date(this.minTemp).getDate();
    // var tomonth=new Date(this.minTemp).getMonth()+1;
    // var toyear=new Date(this.minTemp).getFullYear();
    // var original_date=tomonth+'/'+todate+'/'+toyear;

    //  console.log('dateString: ', original_date);

    return moment(d).format('DD/MM/YYYY')
     
  }

}
