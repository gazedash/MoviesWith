import { Action } from 'redux';

export const FetchSelectedUsers = {
    type: 'FETCH_SELECTED_USERS',
    action(params: Object = {}) { return { type: this.type, ...params } as Action; },
};

export default {};

// if (action.type === FetchSelectedUsers.type) {
// FetchSelectedUsers.action();
// }
