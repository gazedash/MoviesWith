import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MovieList from './MovieList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieList />, div);
});
