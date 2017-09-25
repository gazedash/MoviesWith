import { combineReducers } from "redux";
import { createReducer } from "reduxsauce";
import * as Actions from "../actions";
import R from "ramda";
import data from "./data.json";
// the initial state of this reducer
export interface MovieType {
  poster_path?: string | null;
  media_type?: string;
  title: string;
  credit_id?: string;
  cast: Array<number>;
  fav?: boolean;
  id: number;
}
export interface SearchParams {
  total_pages: number;
  page: number;
}
export interface Actor {
  id: number;
  profile_path: string | null;
  name: string;
  // for cases when showing movies by all actors
  names: string;
}
export interface IState {
  movies: Array<MovieType>;
  actors: Array<Actor>;
  current: number;
  searchParams: { [id: string]: SearchParams };
  showFavs: boolean;
  shouldLoadByAll: boolean;
  fav: { [id: number]: boolean };
  type: "movie" | "tv" | "combined";
  types: typeof types;
}
// export const INITIAL_STATE = [];
export const movie = (
  state = <MovieType[]>[],
  { payload = <MovieType[]>[] } = {}
) => {
  const newMovies = <MovieType[]>[];
  const movies: { [index: number]: MovieType } = {};
  // O(M*N)
  payload.forEach(item => {
    const index = state.findIndex(oldMovie => oldMovie.id === item.id);
    if (index >= 0) {
      movies[index] = item;
    } else {
      newMovies.push(item);
    }
  });
  // O(N)
  const newState = state.map((item, index) => {
    if (movies[index]) {
      let concatCast = (k: string, l: number[], r: number[]) =>
        k === "cast" ? R.concat(l, r) : r;
      return R.mergeWithKey(concatCast, item, movies[index]);
    }
    return item;
  });
  // there were response with two identical ids
  return R.unionWith(R.eqBy(R.prop("id")), newState, newMovies);
};

export const currentActor = (state = null, { payload = null } = {}) => {
  if (state === payload) {
    return null;
  }
  return payload;
};

export const actor = (state = [], { payload = {} } = {}) => {
  if (R.contains(payload, state)) {
    return state;
  }
  return R.append(payload, state);
};

export const removeActor = (state = <Actor[]>[], { payload: id = 0 } = {}) => {
  return state.filter(actorItem => actorItem.id !== id);
};

const types = ["tv", "movie", "combined"];
export const type = (state = "movie", { payload = "movie" } = {}) => {
  if (types.includes(payload)) {
    return payload;
  }
  return state;
};

export const searchParam = (
  state = {},
  { payload: { ids = "", searchParams = <SearchParams> {} } = {} } = {}
) => {
  if ((searchParams.total_pages && searchParams.page)) {
    return { ...state, [ids]: searchParams };
  }
  return state;
  // return assocPath([ids], searchParams, state);
};

export const fav = (
  state: { [id: number]: boolean } = {},
  { payload: id = 0 } = {}
) => {
  return { ...state, [id]: !state[id] };
};

export const showFavs = (state = false, {}) => {
  return !state;
};

export const switchByAllActors = (state = false, {}) => {
  return !state;
};

// map our action types to our reducer functions
// [new Actions.FetchNext().type]: success,
export const MOVIE_HANDLERS = {
  [new Actions.FetchMovies().type]: movie
};
export const CURRENT_HANDLERS = {
  [new Actions.SetCurrentActor().type]: currentActor
};
export const ACTOR_HANDLERS = {
  [new Actions.FetchActor().type]: actor,
  [new Actions.RemoveActor().type]: removeActor
};
export const SEARCH_PARAMS_HANDLERS = {
  [new Actions.SetActorMoviesSearchParams().type]: searchParam
};
export const FAV_HANDLERS = {
  [new Actions.ToggleFav().type]: fav
};
export const SHOW_FAVS_HANDLERS = {
  [new Actions.ShowFavs().type]: showFavs
};
export const SWITCH_BY_ALL_ACTORS = {
  [new Actions.SwitchByAllActors().type]: switchByAllActors
};
export const SWITCH_TYPE = {
  [new Actions.SwitchType().type]: type
};

const storeState = {
  movies: createReducer([], MOVIE_HANDLERS),
  current: createReducer(NaN, CURRENT_HANDLERS),
  actors: createReducer([], ACTOR_HANDLERS),
  searchParams: createReducer({}, SEARCH_PARAMS_HANDLERS),
  fav: createReducer({}, FAV_HANDLERS),
  showFavs: createReducer(false, SHOW_FAVS_HANDLERS),
  shouldLoadByAll: createReducer(false, SWITCH_BY_ALL_ACTORS),
  type: createReducer("movie", SWITCH_TYPE),
  types: () => types
};
export default combineReducers(storeState);
