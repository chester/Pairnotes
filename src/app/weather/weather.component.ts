import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() zipCode: string;
  forecast = [];
  location = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://api.wunderground.com/api/68f84c8ff67e39bb/conditions/forecast/q/CA/' + this.zipCode + '.json').subscribe(data => {
      this.location = data['current_observation']['display_location']['full'];

      /*
        forecast {
          day
          icon_url
          current_temp
          high_temp
          day_description
        }
      */
      for ( var i = 0; i < 4; i++) {
        var weekday = '';
        if( i == 0 ) {
          weekday = 'Today'
        } else {
          weekday = data['forecast']['simpleforecast']['forecastday'][i]['date']['weekday'];
        };
        var day = weekday + ', ' + 
        data['forecast']['simpleforecast']['forecastday'][i]['date']['monthname_short'] + ' ' +
        data['forecast']['simpleforecast']['forecastday'][i]['date']['day'];

        var icon_url = data['forecast']['simpleforecast']['forecastday'][i]['icon_url'] + '';
        var current_temp = data['current_observation']['temp_f'] + ' F';
        var high_temp = data['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit'] + ' F';
        var day_description = data['forecast']['simpleforecast']['forecastday'][i]['conditions'] + '';


        this.forecast[i] = {
          day,//: day,
          icon_url,//: icon_url,
          current_temp,//: current_temp,
          high_temp,//: high_temp,
          day_description //: day_description
        }
      }
    })
  }

}
