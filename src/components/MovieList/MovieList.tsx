import * as React from 'react';
import Movie from '../Movie';
import './MovieList.css';

interface MovieType {
  poster_path?: string | null;
  image?: string | null;
  title: string;
}

interface Props {
  items?: Array<Object>;
  onEndReached?(): void;
}

class MovieList extends React.Component<Props> {
  public static defaultProps: Props = {
    items: [],
    onEndReached: () => { },
  } as Props;
  state = {};

  render() {
    return (
      <div className={'MovieList'}>
        {(this.props.items as Array<MovieType>).map(({ poster_path: image, title }) => (<Movie image={image} title={title} />))}
      </div>
    );
  }
}

export default MovieList;
