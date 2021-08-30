import createAction from "./createAction";

function createAsyncThunk(typePrefix, payloadCreator) {
  const pending = createAction(`${typePrefix}/pending`, (payload) => ({
    payload,
  }));
  const fullfilled = createAction(`${typePrefix}/fullfilled`, (payload) => ({
    payload,
  }));
  const rejected = createAction(`${typePrefix}/rejected`, (error) => ({
    error,
  }));
  function actionCreator(...args) {
    return (dispatch, getState) => {
      let abort;
      dispatch(pending())
      const promise = payloadCreator(...args);
      const abortedPromise = new Promise((resolve, reject) => {
        abort = () => reject("aborted");
      });
      Promise.race([promise, abortedPromise]).then(
        (result) => {
          dispatch(fullfilled(result));
        },
        (err) => {
          dispatch(rejected(err));
        }
      );
      promise.abort = abort;

      return promise;
    };
  }

  return Object.assign(actionCreator, {
    pending,
    fullfilled,
    rejected,
  });
}

export default createAsyncThunk;
