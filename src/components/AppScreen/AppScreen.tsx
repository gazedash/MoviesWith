import * as React from 'react';
import { DispatchProp } from 'react-redux';
import MovieList from '../MovieList'
import './AppScreen.css';

interface Props {
  movies?: Array<{}>;
}

class AppScreen extends React.Component<Props & DispatchProp<{}>> {
  state = {};
  // <MovieList items={this.props.movies} />
  render() {
    return (
      <MovieList items={this.props.movies} />
    );
  }
}

export default AppScreen;
