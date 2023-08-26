import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import rootReducer from "../reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

// Init middleware
const middleware = [thunk, createDebounce()];

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export { store };
