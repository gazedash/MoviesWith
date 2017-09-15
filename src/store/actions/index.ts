import { Action, Dispatch } from "redux";
import * as api from "../../api";
import { ThunkAction } from "redux-thunk";

// export const FetchActor = {
//     type: 'FETCH_ACTOR',
//     action(params: Object = {}) { return { type: this.type, ...params } as Action; },
//     thunk()
// };
export const FetchActor = {
  type: "FETCH_ACTOR",
  action(args: Object = { name: "" }) {
    return async (dispatch: Dispatch<{}>) => {
      const data = await api.fetchActor(name);
      return dispatch({ type: this.type, payload: data });
    };
    // return { type: this.type, name } as Action;
  }
};

export default {
    FetchActor
};

// if (action.type === FetchSelectedUsers.type) {
// FetchSelectedUsers.action();
// }
