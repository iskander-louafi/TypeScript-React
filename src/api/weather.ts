const API_KEY = '2f01a598a09c64c809999fe2f851f803';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

// Based on the API doc at https://openweathermap.org/current#current_JSON
interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
 
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ];

  base: string,

  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  }
  visibility: number,
  wind: {
    speed: number,
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  message?: string,
  cod: number,
  // Complete this interface based on the API docs
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getWeatherIcon(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export interface CurrentWeather {
  icon: string;
  description: string;
  temperature: string;
}

export async function getCurrentWeatherByCity(cityName: string): Promise<CurrentWeather> {
  // Make sure any special characters are encoded in the city name
  const encodedCity = encodeURIComponent(cityName);
  const finalUrl = `${API_URL}&q=${encodedCity}`;

  const weatherData: CurrentWeatherResponse  = await fetchJson(finalUrl);
  if (weatherData.cod !== 200) {
    throw new Error(weatherData.message || 'Unknown error');
  }

  const weatherInfo = weatherData.weather[0];
  const icon = getWeatherIcon(weatherInfo.icon);
  const description = weatherInfo.description;
  const temperature = weatherData.main.temp.toFixed(0);

  return {
    icon,
    description,
    temperature,
  };
}