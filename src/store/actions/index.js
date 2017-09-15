export const FetchSelectedUsers = {
  type: 'FETCH_SELECTED_USERS',
  action: params => ({ type: this.type, params }),
};

export default {};

// if (action.type === FetchSelectedUsers.type) {
// FetchSelectedUsers.action();
// }
