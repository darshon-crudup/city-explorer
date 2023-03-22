import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
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

      console.log(cityDataFromAxios.data[0])

      this.setState({
        cityData: cityDataFromAxios.data[0],
        mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=13`,
        error: false
      });

    } catch (error) {

      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  render() {
    return (
      <>
        <h1>API</h1>

        <form onSubmit={this.getCityData}>
          <label >Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore</button>
        </form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <ul>
              <p id="title">{this.state.cityData.display_name}</p>
              <Image class="map" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Area Map' />
              <p>{this.state.cityData.lon}</p>
              <p>{this.state.cityData.lat}</p>
            </ul>
        }
      </>
    )
  }
}

export default App;
