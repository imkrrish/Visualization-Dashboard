import axios from "axios";
const API_URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_URL : "http://localhost:5000";

// Get total leads
export const getTotalInsights = (params) => {
  return (dispatch) => {
    return axios.get(API_URL + "/api/v1/insights", { params }).then((response) => {
      dispatch({
        type: "GET_TOTAL_INSIGHTS",
        data: response.data,
      });
      return response.data;
    });
  };
};
