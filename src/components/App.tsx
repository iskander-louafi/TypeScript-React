import React from "react";
import { getCurrentWeatherByCity } from "api/weather";
import { CurrentWeather } from "api/weather";
import WeatherView from "../WeatherView";
import "./App.css";

export interface AppState {
  weather?: CurrentWeather;
}

class App extends React.Component<{}, AppState> {
  inputRef: React.RefObject<HTMLInputElement>;
  state: AppState = {};

  constructor(props: {}) {
    super(props);
    this.state = {};
    // Store a reference to the text input to retrieve its value
    this.inputRef = React.createRef();
  }

  getWeather = async () => {
    if(this.inputRef.current?.value){
      try {
        const weather = await getCurrentWeatherByCity(this.inputRef.current.value);
        this.setState({
          weather,
        });
      } catch (error) {
        alert(error.message);
      }
    }
 
  };

  render() {
    const { weather } = this.state;

    return (
      <div className=" container ">
        <div className="App row shadow-lg  mx-auto ">
          <input className="text-center rounded border-1 border-warning mb-1" ref={this.inputRef} type="text" />
          <button className="rounded border-1  border-warning" onClick={this.getWeather}>Get weather!</button>
        </div>
        {weather && (
          <WeatherView weather = {weather}  />
        )}
      </div>
    );
  }
}

export default App;
