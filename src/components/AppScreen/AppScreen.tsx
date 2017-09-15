import * as React from 'react';
import MovieList from '../MovieList'
import './AppScreen.css';

class AppScreen extends React.Component {
  state = {};
  // <MovieList items={this.props.movies} />
  render() {
    return (
      <MovieList />
    );
  }
}

export default AppScreen;
