import * as React from 'react';
import './Movie.css';

interface Props {
  image?: string | null;
  title?: string;
}

class Movie extends React.Component<Props> {
  get source(): string | undefined {
    const { image } = this.props;
    return image ? `https://image.tmdb.org/t/p/w342/${image}` : undefined;
  }

  render() {
    return (
      <div className="Movie">
        <img alt="" className={'MovieImage'} src={this.source} />
      </div>
    );
  }
}

export default Movie;
