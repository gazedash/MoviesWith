import * as React from "react";
import { Actor } from "../../store/reducers";
import { Cancelable, debounce } from "lodash";
import { DispatchProp, MapDispatchToProps } from "react-redux";
import MovieList from "../MovieList";
import ButtonGroup, { Button } from "../ButtonGroup";
import "./AppScreen.css";
import { ActorMovies } from "../../store/selectors/index";

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

class AppScreen extends React.Component<Props> {
  static defaultProps = {
    movies: [],
    actors: [],
    onSumbit: () => {},
    onEnd: debounce(() => {}, 1000),
    onSetActive: () => {},
    onFav: () => {},
    onRemoveActor: () => {},
    switchByAll: () => {},
    switchType: () => {},
    shouldShowFavs: false,
    current: null,
    types: [],
    type: "movie"
  };
  state = {};
  input: HTMLInputElement | null = null;

  onClick = ({ key = null }: { key?: string | null } = { key: null }) => {
    if (key === "Enter" || !key) {
      const { onSubmit = (args?: {} | null) => {} } = this.props;
      const { value = null } = this.input || {};
      onSubmit(value);
    }
  };

  // <MovieList items={this.props.movies} />
  render() {
    return (
      <div className={"AppScreen"}>
        <div className={"AppScreen-header"}>
          <div className={"AppScreen-search"}>
            <input
              onKeyUp={this.onClick}
              type="text"
              ref={input => (this.input = input)}
            />
            <Button onClick={this.onClick as () => void} item={"go"} />
          </div>
          <div className={"AppScreen-controls"}>
            <Button
              item={"favlist"}
              onClick={this.props.showFavs}
              active={this.props.shouldShowFavs}
            />
            {!this.props.shouldShowFavs && (
              <Button
                item={"by all actors only"}
                onClick={this.props.switchByAll}
                active={this.props.shouldLoadByAll}
              />
            )}
          </div>
        </div>
        <ButtonGroup
          className={"AppScreen-tabs"}
          items={this.props.types}
          active={this.props.type}
          onClick={this.props.switchType}
        />
        {this.props.shouldShowFavs ? (
          <MovieList onFav={this.props.onFav} items={this.props.movies} />
        ) : (
          (this.props
            .actors as ActorMovies[]).map(
            ({ actor: { id, names, name }, movies }) => {
              return (
                <div key={id}>
                  <div className={"ActorHeader"}>
                    <div
                      onClick={() =>
                        (this.props.onSetActive as (id: number) => void)(id)}
                    >
                      {this.props.shouldLoadByAll ? names : name}
                    </div>
                    <Button
                      onClick={() =>
                        (this.props.onRemoveActor as (id: number) => void)(id)}
                      item={"X"}
                    />
                  </div>
                  {(this.props.current === id ||
                    (this.props.actors as ActorMovies[]).length === 1) && (
                    <MovieList
                      onFav={this.props.onFav}
                      onEndReached={this.props.onEnd}
                      items={movies}
                    />
                  )}
                </div>
              );
            }
          )
        )}
      </div>
    );
  }
}

export default AppScreen;
