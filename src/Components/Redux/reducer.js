export const initialState = {
  user: null,
};

//  push data into the data Layer  ==> Push user into data layer
export const actionTypes = {
  SET_User: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_User:
      return {
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
