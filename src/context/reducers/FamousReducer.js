// REDUCER
export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STEP':
      return { ...state, currentStep: action.data };
    case 'SET_STATE':
      return { ...state, famousList: action.data };
    case 'UPDATE_CURRENT_FAMOUS':
      let objIndex = state.famousList.findIndex(obj => {
        return obj._id == action.data._id;
      });

      state.famousList[objIndex]._id = action.data._id;
      state.famousList[objIndex].firstname = action.data.firstname;
      state.famousList[objIndex].lastname = action.data.lastname;
      state.famousList[objIndex].dob = action.data.dob;
      state.famousList[objIndex].biography = action.data.biography;

      return { ...state, formList: state.famousList };
    case 'SET_CURRENT_FAMOUS_ID':
      return { ...state, currentFamousId: action.data };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.data };
    case 'CHANGE_EDITING_STATUS':
      return { ...state, editingStatus: action.data };
    default:
      break;
  }
};
