import { configureStore, createAction, createReducer } from "./redux-toolkit";
import createSlice from "./redux-toolkit/createSlice";

// const add = createAction('add')
// const minus = createAction('minus')

// const reducer = createReducer({num: 0},{
//   [add.type]: (state, action) => ({...state, num: state.num + action.payload}),
//   [minus.type]: (state, action) => ({...state, num: state.num - action.payload})
// })

// const ADD = 'ADD'
// const MINUS = 'MINUS'
// const reducer = (state = { num: 0 }, action) => {
//   switch (action.type) {
//     case ADD:
//       return {
//         ...state,
//         num: state.num + action.payload,
//       };
//     case MINUS:
//       return {
//         ...state,
//         num: state.num + action.payload,
//       };
//     default:
//       return state;
//   }
// };
const { reducer, actions } = createSlice({
  name: "counter",
  initialState: { num: 0 },
  reducers: {
    add: (state, action) => {
      state.num += action.payload;
    },
    minus: (state, action) => {
      state.num -= action.payload;
    },
  },
});
const store = configureStore({
  reducer,
});

store.subscribe(() => render());

const render = () => {
  document.getElementById("num").innerHTML = store.getState().num;
};
document.getElementById("add").addEventListener(
  "click",
  () => {
    store.dispatch(actions.add(1));
  },
  false
);

document.getElementById("asyncAdd").addEventListener(
  "click",
  () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch(actions.add(1));
      }, 1000);
    });
  },
  false
);

document.getElementById("minus").addEventListener(
  "click",
  () => {
    store.dispatch(actions.minus(1));
  },
  false
);

render();
