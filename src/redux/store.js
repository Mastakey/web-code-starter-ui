import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import codeReducer from "./reducers/codeReducer";
import fieldReducer from "./reducers/fieldReducer";
import objReducer from "./reducers/objReducer";
import appReducer from "./reducers/appReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,
  code: codeReducer,
  field: fieldReducer,
  obj: objReducer,
  app: appReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
