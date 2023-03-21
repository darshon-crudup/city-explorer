import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
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
  error: false
});

  } catch (error){

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
            <input type="text" onChange={this.handleCityInput}/>
          </label>
        <button type="submit">Explore</button>
      </form>

        {
        this.state.error
        ? <p>{this.state.errorMessage}</p>
        : <p>{this.state.cityData.display_name}</p>  
        }
      </>
    )
  }
}

export default App;
