// initalState
const initialState = {
  insightData: [],
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOTAL_INSIGHTS":
      return {
        ...state,
        insightData: action.data,
      };
    default:
      return { ...state };
  }
};

export default dashboard;
