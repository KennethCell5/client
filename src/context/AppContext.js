import React, { createContext } from 'react';
import StateEntry from './states/Index';

export const AppContext = createContext();

function AppContextProvider(props) {
  return (
    <AppContext.Provider value={{ ...StateEntry() }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
