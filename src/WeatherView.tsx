import { CurrentWeather } from "api/weather";
import React from "react";
import "./components/App.css";


type weatherProps = {
weather: CurrentWeather
}

class WeatherView extends React.Component<weatherProps> {

  render() {
    
    return (
      <div className= "row  mb-5 op rounded box-width mx-auto my-auto border border-warning" >
        <div className ="mx-auto text-center">
          <img src={this.props.weather.icon} alt={this.props.weather.description} />
          <p className ="">{this.props.weather.temperature} °C</p>
          <p className ="">{this.props.weather.description}</p>
        </div>
      </div>
    );
  }
}
export default WeatherView;
