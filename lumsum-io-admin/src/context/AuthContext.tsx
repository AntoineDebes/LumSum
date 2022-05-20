import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import jwtDecode from "jwt-decode";
import authReducer, { IState, Actions } from "./reducers/authReducer";

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  state: IState;
  dispatch: Dispatch<Actions>;
}

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token as string) : null;
const initState: IState = {
  user,
  isLoggedIn: Boolean(user),
};

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
