import { useReducer } from 'react';
import { reducer } from '../reducers/FamousReducer';
import FamousListener from '../listeners/FamousListener';

// INITIAL STATE
const initialState = {
  currentStep: 1,
  currentFamousId: null,
  searchValue: '',
  editStatus: false,
  famousList: []
};

export default function FamousState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // LISTENERS
  FamousListener(dispatch);

  return { state, dispatch };
}
