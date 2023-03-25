import React from 'react';
import axios from 'axios';
// import Image from 'react-bootstrap/Image'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // locationData: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: [],
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  getCityData = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;

      this.handleGetWeather(lat, lon);

      
    } catch (error) {

      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  handleGetWeather = async (lat, lon) => {
    try {
   
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;
      //http://localhost:3001/weather?lat=43.234324&lon=9304290.3432&searchQuery=SeAttle  
      
    let weatherDataFromAxios = await axios.get(url);

    console.log('Weather: ', weatherDataFromAxios.data)

    this.setState({
      weatherData: weatherDataFromAxios.data
    })  

    } catch (error) {
      console.log(error.message)
    }
  } 

  render() {
    return (
      <>
        <h1>Welcome to Hello Search 👋🏾</h1>

        <form onSubmit={this.getCityData}>
          <label >Enter Your Favorite City<br />
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore</button>
        </form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <>
              <p>{this.state.cityData.display_name}</p>
              <p>Lat: {this.state.cityData.lon}</p>
              <p>Lon: {this.state.cityData.lat}</p>
            </>
        }
      </>
    )
  }
}

export default App;
