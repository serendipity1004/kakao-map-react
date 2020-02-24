import * as React from 'react';

interface IState {
  map: any;
}

interface IAction {
  type: 'SET_MAP';
  payload: any;
}

interface IDispatch {
  (action: IAction): void
}

const MapStateContext = React.createContext<IState | undefined>(undefined);
const MapDispatchContext = React.createContext<IDispatch | undefined>(undefined);

const mapReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'SET_MAP':
      return {
        ...state,
        map: action.payload,
      };

    default:
      return state;
  }
};

const MapProvider: React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(mapReducer, {map: null});

  return (
    <MapStateContext.Provider value={state}>
      <MapDispatchContext.Provider value={dispatch}>
        {children}
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  )
};

const useMapState = () => {
  const context = React.useContext(MapStateContext);

  if (context === undefined) {
    throw new Error('useMapState must be used within a MapProvider');
  }

  return context;
};

const useMapDispatch = () => {
  const context = React.useContext(MapDispatchContext);

  if (context === undefined) {
    throw new Error('useDispatch must be used within a MapProvider');
  }

  return context;
};

export {
  MapProvider,
  useMapState,
  useMapDispatch,
}
