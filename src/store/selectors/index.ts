import { createSelector } from "reselect";
import {
  filter,
  contains,
  reduce,
  all,
  isEmpty,
  map,
  pipe,
  compose
} from "ramda";
import { Actor, MovieType, IState } from "../reducers";

// const moviesSelector = ({ movies = <MovieType[]>[], fav, showFavs } = {}) => movies;
const moviesSelector = createSelector(
  ({ movies }) => movies,
  ({ type }) => type,
  (movies, type) =>
    type === "combined"
      ? movies
      : filter(({ id, media_type }) => {
          if (media_type) {
            return media_type === type;
          }
          return true;
        }, movies)
);
export const favMoviesSelector = createSelector(
  ({ movies }) => movies,
  ({ fav }) => fav,
  ({ type }) => type,
  (movies: MovieType[], fav, type) =>
    type === "combined"
      ? filter(({ id }) => !!fav[id], movies)
      : filter(({ id, media_type }) => {
          const inFav = fav[id];
          if (media_type) {
            return media_type === type && inFav;
          }
          return inFav;
        }, movies)
);
const favMoviesOrMoviesSelector = (state: IState) =>
  state.showFavs ? favMoviesSelector(state) : moviesSelector(state);

// const actorsSelector = ({ actors = [] } = {}) => actors;

const shouldLoadByAllSelector = ({ shouldLoadByAll = false }) =>
  shouldLoadByAll;
const favSelector = ({ fav = {} }) => fav;
const showFavsSelector = ({ showFavs = false }) => showFavs;

const isActorInCast = ({ cast }: { cast: number[] }, id: number) =>
  contains(id, cast);
const isEveryActorInCast = (
  { cast = [] }: { cast?: number[] } = {},
  actors: Actor[]
) => all(({ id }: Actor) => contains(id, cast))(actors);

export interface ActorMovies {
  actor: Actor;
  movies: MovieType[];
}

export const allActorsInCastMovies = (
  actors = <Actor[]>[],
  movies = <MovieType[]>[],
  fav: { [id: number]: boolean } = {}
) => {
  const actor = actors && actors.length >= 1 ? actors[actors.length - 1] : null;
  if (actor) {
    const moviesFiltered = map(
      movie => ({ fav: fav[movie.id], ...movie }),
      filter(movie => isEveryActorInCast(movie, actors), movies)
    );
    // return { actor, movies: moviesFiltered };
    return moviesFiltered;
  }
  return <ActorMovies[]>[];
};

export const currentActorSelector = createSelector(
  ({ current }) => current,
  ({ actors }) => actors,
  (current, actors) => actors.find(({ id }: Actor) => id === current)
);

const allActorsInCastMoviesSelector = createSelector(
  ({ actors }) => actors,
  favMoviesOrMoviesSelector,
  ({ fav }) => fav,
  (actors, movies, fav) => allActorsInCastMovies(actors, movies, fav)
);

const actorsMoviesSelector = createSelector(
  ({ actors }) => actors,
  favMoviesOrMoviesSelector,
  ({ fav }) => fav,
  currentActorSelector,
  (actors, movies, fav, currentActor) =>
    actorsMovies(actors, movies, fav, currentActor)
);

export const actorsMovies = (
  actors = <Actor[]>[],
  movies = <MovieType[]>[],
  fav: { [id: number]: boolean } = {},
  currentActor: Actor
) => {
  const id = currentActor ? currentActor.id : 0;
  if (Number.isFinite(id)) {
    const moviesFiltered = map(
      movie => ({ fav: fav[movie.id], ...movie }),
      filter(movie => isActorInCast(movie, id), movies)
    );
    if (!isEmpty(moviesFiltered)) {
      return moviesFiltered;
    }
  }
  return [];
};

export const actorsMoviesSelectorGlobal = (state: IState) =>
  state.shouldLoadByAll
    ? allActorsInCastMoviesSelector(state)
    : actorsMoviesSelector(state);
