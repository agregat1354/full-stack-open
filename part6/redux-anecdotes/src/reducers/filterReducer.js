const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export { filterReducer as default, setFilter };
