import { UserInfo, Action } from "src/typescript/interfaces";

const reducer = function (state: UserInfo, action: Action): UserInfo {
  // action type / payload
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
