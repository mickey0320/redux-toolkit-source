import createAction from "./createAction";
import createReducer from "./createReducer";

function getType(namespace, type) {
  return `${namespace}/${type}`;
}
function createSlice(options) {
  const { name, reducers, initialState } = options;
  const prefixReduders = {};
  const actions = {};
  Object.keys(reducers).forEach((type) => {
    const prefixType = getType(name, type);
    prefixReduders[prefixType] = reducers[type];
    actions[type] = createAction(prefixType);
  });
  const reducer = createReducer(initialState, prefixReduders);

  return {
    reducer,
    actions,
  };
}

export default createSlice;
