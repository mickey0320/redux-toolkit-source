import { produce } from "immer";

function createReducer(initialState, reducers) {
  function reducer(state = initialState, action) {
    const type = action.type;
    const r = reducers[type];
    if (r) {
      return produce(state, (draft) => r(draft, action));
    }
    return state;
  }

  return reducer;
}

export default createReducer;
