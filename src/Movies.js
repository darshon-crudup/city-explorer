import React from 'react';

class MovieData extends React.Component {
  render() {
    console.log(this.props.cityMovieData);
    return(

      <>
      <section>{this.props.cityMovieData.map(filmInfo => <h2>{filmInfo.title}</h2>)}
      { this.props.cityMovieData.map(filmInfo => <p>{filmInfo.overview}</p>)}
      </section>

      </>
    )
  }
}  

export default MovieData;