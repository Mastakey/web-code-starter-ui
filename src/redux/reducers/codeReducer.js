//code reducers
import {
  CREATE_CODE,
  READ_CODE_ALL,
  READ_CODE,
  UPDATE_CODE,
  DELETE_CODE,
  READ_LOADING_CODE,
  WRITE_LOADING_CODE,
  SET_CODE_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  codes: [],
  code: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_CODE_ALL:
      return {
        ...state,
        readLoading: false,
        codes: action.payload,
        error: {}
      };
    case READ_CODE:
      return {
        ...state,
        readLoading: false,
        code: action.payload,
        error: {}
      };
    case CREATE_CODE:
      return {
        ...state,
        writeLoading: false,
        codes: [...state.codes, action.payload],
        error: {}
      };
    case DELETE_CODE:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_CODE:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_CODE:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_CODE:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_CODE_ERROR:
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
