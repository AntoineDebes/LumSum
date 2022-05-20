import { Reducer } from "react";
import * as AUTH from "../../constants/auth";

export interface IState {
  isLoggedIn: boolean;
  user: any;
}

export interface Actions {
  type: string;
  value?: any;
}

const authReducer: Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case AUTH.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
