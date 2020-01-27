//obj reducers
import {
  CREATE_OBJ,
  READ_OBJ_ALL,
  READ_OBJ_APP,
  READ_OBJ,
  UPDATE_OBJ,
  DELETE_OBJ,
  READ_LOADING_OBJ,
  WRITE_LOADING_OBJ,
  SET_OBJ_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  objs: [],
  obj: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_OBJ_ALL:
      return {
        ...state,
        readLoading: false,
        objs: action.payload,
        error: {}
      };
    case READ_OBJ_APP:
      return {
        ...state,
        readLoading: false,
        objs: action.payload,
        error: {}
      };
    case READ_OBJ:
      return {
        ...state,
        readLoading: false,
        obj: action.payload,
        error: {}
      };
    case CREATE_OBJ:
      return {
        ...state,
        writeLoading: false,
        objs: [...state.objs, action.payload],
        error: {}
      };
    case DELETE_OBJ:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_OBJ:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_OBJ:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_OBJ:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_OBJ_ERROR:
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
