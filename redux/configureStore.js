import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import app from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { getCurrentPositionEpic } from "./actions/userLocationActions";

export default function configureStore() {
  return createStore(
    app,
    applyMiddleware(thunk, logger, createEpicMiddleware(getCurrentPositionEpic))
  );
}
