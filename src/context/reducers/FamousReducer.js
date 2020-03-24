// REDUCER
export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STEP':
      return { ...state, currentStep: action.data };
    case 'SET_STATE':
      return { ...state, famousList: action.data };
    case 'SET_CURRENT_FAMOUS_ID':
      return { ...state, currentFamousId: action.data };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.data };
    default:
      break;
  }
};
