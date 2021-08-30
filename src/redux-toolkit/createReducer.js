import { produce } from "immer";

function createReducer(initialState, reducers, extraReducers) {
  function reducer(state = initialState, action) {
    const type = action.type;
    if (reducers[type]) {
      return produce(state, (draft) => reducers[type](draft, action));
    }
    if (extraReducers[type]) {
      return produce(state, (draft) => extraReducers[type](draft, action));
    }
    return state;
  }

  return reducer;
}

export default createReducer;
