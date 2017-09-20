/**
 * @flow
 */

// import * as React from 'react';
import {
  connect,
  MapStateToProps,
  Dispatch,
  InferableComponentEnhancer
} from "react-redux";
import { debounce } from "lodash";
import {
  actorsMoviesSelectorGlobal,
  favMoviesSelector
} from "../store/selectors";
import {
  FetchMovies,
  FetchNext,
  SetCurrentActor,
  ToggleFav,
  ShowFavs,
  RemoveActor,
  SwitchByAllActors,
  SwitchType
} from "../store/actions";
import AppScreen, { Props } from "../components/AppScreen";
import { IState } from "../store/reducers/index";

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  onSubmit: (name: string | null) => {
    dispatch(new FetchMovies().action({ with_cast: name }));
  },
  onEnd: debounce(() => {
    dispatch(new FetchNext().action());
  }, 500),
  onSetActive: (id: number) => {
    dispatch(new SetCurrentActor().action(id));
  },
  onFav: (id: number) => {
    dispatch(new ToggleFav().action(id));
  },
  showFavs: () => {
    dispatch(new ShowFavs().action());
  },
  onRemoveActor: (id: number) => {
    dispatch(new RemoveActor().action(id));
  },
  switchByAll: () => {
    dispatch(new SwitchByAllActors().action());
  },
  switchType: (type: string) => {
    dispatch(new SwitchType().action(type));
  }
});

const mapStateToProps: MapStateToProps<{}, {}> = (state: IState, ownProps) => {
  return {
    current: state.current,
    shouldLoadByAll: state.shouldLoadByAll,
    shouldShowFavs: state.showFavs,
    movies: favMoviesSelector(state),
    actors: actorsMoviesSelectorGlobal(state),
    fav: state.current,
    types: state.types,
    type: state.type
  };
};

const connectWrapper: InferableComponentEnhancer<Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default connectWrapper(AppScreen);