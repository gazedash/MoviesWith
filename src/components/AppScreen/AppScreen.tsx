import * as React from 'react';
import { DispatchProp } from 'react-redux';
import MovieList from '../MovieList'
import './AppScreen.css';

export interface Props {
  movies?: Array<{}>;
  actors?: Array<{}>;
  current?: number | null;
  types?: string[];
  type?: string;
  shouldLoadByAll?: boolean;
  shouldShowFavs?: boolean;
  onEnd?: (() => void) & Cancelable;
  onSubmit?(name: string | null): void;
  onSetActive?(id: number): void;
  onFav?(id: number): void;
  showFavs?(): void;
  onRemoveActor?(id: number): void;
  switchByAll?(): void;
  switchType?(type: string): void;
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
