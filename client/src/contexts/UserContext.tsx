// src/contexts/UserContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of the user data
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the state type
interface UserState {
  user: User | null;
  token: string | null;
}

// Define action types
type UserAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" };

// Define context type
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

// Retrieve user and token from localStorage
const getInitialUserState = (): UserState => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
};

// Reducer function to manage user state
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      // Store user and token in localStorage on login
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      // Clear localStorage on logout
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// Create the context with a default value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, getInitialUserState());

  // Custom hook to persist state changes in localStorage
  useEffect(() => {
    if (state.user && state.token) {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    }
  }, [state.user, state.token]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
