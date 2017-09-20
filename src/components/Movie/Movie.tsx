import * as React from "react";
import fav from "../../assets/ic_favorite_border_black_24px.svg";
import "./Movie.css";

interface Props {
  image?: string | null;
  title?: string;
  fav?: boolean;
  onFav?(): void;
}

class Movie extends React.Component<Props> {
  get source(): string | undefined {
    const { image } = this.props;
    return image ? `https://image.tmdb.org/t/p/w342/${image}` : undefined;
  }

  get className() {
    return `Movie-hide ${this.props.fav ? "Movie-show" : ""}`;
  }

  render() {
    return (
      <div className="Movie">
        <div className="Movie-hide-absolute">
          <img
            onClick={this.props.onFav}
            src={fav}
            alt="fav"
            className={this.className}
          />
        </div>
        {this.source && (
          <img alt="" className={"MovieImage"} src={this.source} />
        )}
      </div>
    );
  }
}

export default Movie;
