import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Movie from './Movie';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Movie />, div);
});
