import React from 'react';
import axios from 'axios';
// import Image from 'react-bootstrap/Image';
import './App.css';
// import Weather from './Weather';
import MovieData from './Movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      cityWeatherData: [],
      cityMovieData: [],
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
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });
      
      this.handleGetWeather(lat, lon);
      this.getMovieData();
    } catch (error) {
      this.setState({
        errorMessage: false,
      })
    }
    
  }
  
  handleGetWeather = async (lat, lon) => {
    try {
   
      let url = `${process.env.WEATHER_API_KEY}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;
      //http://localhost:3001/weather?lat=43.234324&lon=9304290.3432&searchQuery=SeAttle  
      
    let cityWeatherDataFromAxios = await axios.get(url);

    let weatherArr = cityWeatherDataFromAxios.data.map((forecast, key) => {
      return forecast

    }) 

    this.setState({
      cityWeatherData: weatherArr,
      error: false
    })  

    } catch (error) {
      console.log(error.message)
    }
  } 

  getMovieData = async () => {
    try {
      // let movieUrl = (`${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`)

      let movieUrl = (`${process.env.REACT_APP_SERVER}/movie?searchQuery=${this.state.city}`)
      
      let movieDataFromAxios = await axios.get(movieUrl)

      // let movieArr = movieDataFromAxios.data.map((movies, key) => {
      //   return movies
      console.log(movieDataFromAxios)
      this.setState({
        cityMovieData: movieDataFromAxios.data
      })
    }  catch (error) {
        this.setState({
          errorMessage: false,
        })
      }
    }   
    
    
    render() {
      
      return (
        
        <section>
          <h1>Welcome to Hello Search 🔎</h1>
          <form onSubmit={this.getCityData}>
          <label >Enter Your Favorite City<br />
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore</button>
        </form>
        {/* <cityExplorerForm
          city={this.state.city}
          cityData={this.state.cityData}
          getCityData={this.getCityData}
          handleCityInput={this.handleCityInput}
        /> */}
        {this.state.city.display_name &&
          <div id='idText'>
            <p>
              {this.state.city.display_name}
            </p>
          </div>
        }


      {this.state.error
      ? <p>{this.state.errorMessage}</p>
      : Object.keys(this.state.cityData).length > 0 &&
      <div id="dataContainer"> <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='map of current city'></img>
      <section id='textContainer'>
        <div>
        <h1>Coordinates By Location 🧭</h1>
          <p>Latitude:{this.state.cityData.lat}</p>
        </div>
        <div>
          <p>Longitude:{this.state.cityData.lon}</p>
        </div>
      </section>
      </div>

  }
        <h1>Movies By Location 🎥</h1>
        <div id="movieData">
        <MovieData
          cityMovieData={this.state.cityMovieData}
          />
          </div>
        <weatherData 
          cityWeatherData={this.state.cityWeatherData}
          />
      </section>
    )
  }
  
}  

export default App;
