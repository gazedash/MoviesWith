import * as React from "react";
import Movie from "../Movie";
import "./MovieList.css";
import { MovieType } from "../../store/reducers";
import { isBottomOfElement } from "../../utils/index";
import { Cancelable, debounce } from "lodash";

interface Props {
  items?: Array<Object>;
  onEndReached?(): void;
  // onEndReached?: (()=>void) & Cancelable;
  onFav?(id: number): void;
}

class MovieList extends React.Component<Props> {
  public static defaultProps: Props = {
    items: [],
    onEndReached: () => {},
    // onEndReached: debounce(() => {}, 1000),
    onFav: () => {}
  } as Props;
  scrollable: HTMLDivElement | null = null;
  state = {};

  onScroll = () => {
    if (isBottomOfElement(this.scrollable)) {
      const { onEndReached = () => {} } = this.props;
      onEndReached();
    }
  };

  handleFav = (id: number) => (this.props.onFav as (id: number) => void)(id);

  // >).map(({ poster_path: image, title, id, fav, credit_id = "" }) => (
  render() {
    return (
      <div
        ref={scrollable => (this.scrollable = scrollable)}
        onScroll={this.onScroll}
        className={"MovieList"}
      >
        {(this.props.items as Array<
          MovieType
        >).map(({ poster_path: image, title, id, fav, credit_id = "", media_type }) => {
          return (
            <Movie
              type={media_type}
              id={id}
              fav={fav}
              onFav={() => this.handleFav(id)}
              key={id + credit_id}
              image={image}
              title={title}
            />
          );
        })}
      </div>
    );
  }
}

export default MovieList;
