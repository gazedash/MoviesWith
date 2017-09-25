import { Dispatch } from "redux";
import { IState, Actor } from "../reducers";
import * as api from "../../api";
import { ThunkAction } from "redux-thunk";

export class FetchActor {
  type = "FETCH_ACTOR";
  action(idOrName?: string | number) {
    interface Response {
      results?: Array<Object>;
    }
    return async (dispatch: Dispatch<{}>, getState: () => IState) => {
      const { actors } = getState();
      let payload = actors.find(
        actor =>
          actor.name === idOrName || actor.id === parseInt(<string>idOrName, 10)
      );
      if (!payload) {
        const {
          results = []
        }: Response = await api.fetchActor(<string>idOrName);
        payload = <Actor>results[0];
      }
      return dispatch({ type: this.type, payload });
    };
  }
}

interface IDefaultAction {
  type: string;
  action(payload?: {}): {};
}

export interface Action {
  type: string;
  payload?: {} | Array<{}> | null;
}

export class DefaultAction implements IDefaultAction {
  type = "DEFAULT_ACTION";
  action(payload?: {}) {
    return { type: this.type, payload: payload ? payload : {} };
  }
}

export class SetActorMoviesSearchParams extends DefaultAction {
  type = "SET_ACTOR_MOVIES_SEARCH_PARAMS";
}
export class RemoveActor extends DefaultAction {
  type = "REMOVE_ACTOR";
}
export class SetCurrentActor extends DefaultAction {
  type = "SET_CURRENT_ACTOR";
}
export class ToggleFav extends DefaultAction {
  type = "TOGGLE_FAV";
}
export class ShowFavs extends DefaultAction {
  type = "SHOW_FAVS";
}
export class SwitchByAllActors extends DefaultAction {
  type = "SWITCH_BY_ALL_ACTORS";
}
export class SwitchType extends DefaultAction {
  type = "SWITCH_TYPE";
}
export class FetchNext {
  type = "FETCH_NEXT";
  action() {
    return async (dispatch: Dispatch<{}>, getState: () => IState) => {
      const { current, searchParams, actors, showFavs, type } = getState();
      if (!showFavs && type === "movie") {
        const lastId = actors.length - 1;
        let { id = null } = actors[lastId];
        id = current ? current : id;
        const ids = (id || "").toString();
        const { total_pages = 1, page = 1 } = searchParams[ids] || {};
        console.log('====================================');
        console.log(searchParams[ids], total_pages > page && id, (total_pages > page) && id);
        console.log('====================================');
        if (total_pages > page && id) {
          const args = { with_cast: ids, page: page + 1, setCurrent: false };
          dispatch({ type: this.type, ...args });
          return dispatch(new FetchMovies().action(args));
        }
      }
    };
  }
}

export class FetchMovies {
  type = "FETCH_MOVIES";
  action(args: {} = {}) {
    interface Args {
      with_cast?: Array<number> | number | string;
      page?: number;
      setCurrent?: boolean;
      stop?: boolean;
      type?: "tv" | "movie" | "combined";
    }
    interface Response {
      results?: Array<Object>;
      cast?: Array<Object>;
    }

    let { with_cast, setCurrent = true, stop = false, ...rest }: Args = args;
    return async (dispatch: Dispatch<{}>, getState: () => IState) => {
      let { type } = getState();
      if (rest.type) {
        type = rest.type;
      }
      if (typeof with_cast === "string") {
        const { payload: { id = 0 } = {} } = await dispatch(
          new FetchActor().action(with_cast)
        );
        with_cast = id;
      }
      if (with_cast) {
        const ids = with_cast.toString();
        let {
          results = [],
          cast = [],
          ...searchParams
        }: Response = await api.fetchMovies({
          with_cast: ids,
          type,
          ...rest || {}
        });
        // dispatch searchParams
        dispatch(
          new SetActorMoviesSearchParams().action({ ids, searchParams })
        );
        if (setCurrent) {
          dispatch(new SetCurrentActor().action(with_cast));
        }
        const castArray = (<number[]>[]).concat(with_cast);
        if (type !== "movie") {
          results = cast;
        }
        const payload = results.map(movie => {
          return { media_type: type, ...movie, cast: castArray };
        });
        if (type === 'movie' && !stop) {
          dispatch(new FetchMovies().action({ with_cast, setCurrent: false, type: 'tv', stop: true }))
        }
        return dispatch({ type: this.type, payload });
      }
    };
  }
}

export default {
  FetchActor,
  FetchMovies,
  FetchNext,
  SetActorMoviesSearchParams,
  SetCurrentActor
};