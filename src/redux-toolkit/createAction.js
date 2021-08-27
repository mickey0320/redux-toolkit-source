function createAction(type, prepareAction) {
  function actionCreator(payload) {
    if (typeof prepareAction === "function") {
      return {
        type,
        ...prepareAction(payload),
      };
    }
    return {
      type,
      payload,
    };
  }
  actionCreator.type = type;

  return actionCreator;
}

export default createAction;
