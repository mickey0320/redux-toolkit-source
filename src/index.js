import { createAsyncThunk, createSlice, configureStore } from "./redux-toolkit";
import axios from "axios";

const getUsers = createAsyncThunk("/users", async (id) => {
  return axios.get("/users.json").then(res => res.data);
});

const { reducer } = createSlice({
  name: "user",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    [getUsers.pending.type](state) {
      state.isLoading = true;
    },
    [getUsers.fullfilled.type](state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getUsers.rejected.type](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const store = configureStore({
  reducer,
});

store.dispatch(getUsers(1));
