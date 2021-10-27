import React, {createContext, useContext, useReducer} from 'react';
import AppReducer, { initialState } from './app.reducer';


export const InitDataContext = createContext();

export const InitDataContextProvider = (props) => {
  console.log(props)
  const [globalState, dispatch] = useReducer(AppReducer, initialState);

  return props ?  (
    <InitDataContext.Provider value={{globalState, dispatch}}>
      {props.children}
    </InitDataContext.Provider>
  ): <div></div>;
};