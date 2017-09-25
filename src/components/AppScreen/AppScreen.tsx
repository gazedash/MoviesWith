import * as React from "react";
import { Actor, MovieType } from "../../store/reducers";
import { Cancelable, debounce } from "lodash";
import { DispatchProp, MapDispatchToProps } from "react-redux";
import MovieList from "../MovieList";
import ButtonGroup, { Button } from "../ButtonGroup";
import "./AppScreen.css";
import { ActorMovies } from "../../store/selectors/index";

export interface Props {
  favMovies?: MovieType[];
  activeMovies?: MovieType[];
  actors?: Actor[];
  current?: number | null;
  types?: string[];
  type?: string;
  shouldLoadByAll?: boolean;
  shouldShowFavs?: boolean;
  onEnd?: (() => void) & Cancelable;
  currentActor?: Actor | {};
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
    favMovies: [],
    activeMovies: [],
    actors: [],
    currentActor: {},
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

  get items() {
    return this.props.shouldShowFavs
      ? this.props.favMovies
      : this.props.activeMovies;
  }

  onEndReached = this.props.shouldShowFavs ? () => {} : this.props.onEnd;

  onClick = ({ key = null }: { key?: string | null } = { key: null }) => {
    if (key === "Enter" || !key) {
      const { onSubmit = (args?: {} | null) => {} } = this.props;
      const { value = null } = this.input || {};
      onSubmit(value);
    }
  };

  renderActor(actor?: Actor) {
    const { id, name }: { id?: number; name?: string } = actor || {};
    if (id && name) {
      return (
        <div
          key={id}
          className={`Actor ${this.props.current === id ? "Actor-active" : ""}`}
        >
          <div
            onClick={
              this.props.current !== id ? (
                () => (this.props.onSetActive as (id: number) => void)(id)
              ) : (
                () => {}
              )
            }
          >
            {name}
          </div>
          <Button
            onClick={() =>
              (this.props.onRemoveActor as (id: number) => void)(id)}
            item={"X"}
          />
        </div>
      );
    }
    return null;
  }

  // <MovieList items={this.props.movies} />
  render() {
    return (
      <div className={"AppScreen"}>
        <div className={"AppScreen-header"}>
          <div className={"AppScreen-left-header"}>
            <div className={"AppScreen-search"}>
              <input
                onKeyUp={this.onClick}
                type="text"
                ref={input => (this.input = input)}
              />
              <Button onClick={this.onClick as () => void} item={"go"} />
            </div>
            <div className={"AppScreen-controls"}>
              {!this.props.shouldShowFavs && (
                <Button
                  item={"by all actors only"}
                  onClick={this.props.switchByAll}
                  active={this.props.shouldLoadByAll}
                />
              )}
              <Button
                item={"favlist"}
                onClick={this.props.showFavs}
                active={this.props.shouldShowFavs}
              />
            </div>
          </div>
          <ButtonGroup
            className={"AppScreen-content-type-tabs"}
            items={this.props.types}
            active={this.props.type}
            onClick={this.props.switchType}
          />
          <div className={"ActorTabs"}>
            {!this.props.shouldShowFavs &&
              (this.props.actors as Actor[]).map(actor =>
                this.renderActor(actor)
              )}
          </div>
        </div>
        <MovieList
          onFav={this.props.onFav}
          onEndReached={this.onEndReached}
          items={this.items}
        />
      </div>
    );
  }
}

export default AppScreen;
