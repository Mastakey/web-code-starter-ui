//app reducers
import {
  CREATE_APP,
  READ_APP_ALL,
  READ_APP,
  UPDATE_APP,
  DELETE_APP,
  READ_LOADING_APP,
  WRITE_LOADING_APP,
  SET_APP_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  apps: [],
  app: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_APP_ALL:
      return {
        ...state,
        readLoading: false,
        apps: action.payload,
        error: {}
      };
    case READ_APP:
      return {
        ...state,
        readLoading: false,
        app: action.payload,
        error: {}
      };
    case CREATE_APP:
      return {
        ...state,
        writeLoading: false,
        apps: [...state.apps, action.payload],
        error: {}
      };
    case DELETE_APP:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_APP:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_APP:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_APP:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_APP_ERROR:
      return {
        ...state,
        readLoading: false,
        writeLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
