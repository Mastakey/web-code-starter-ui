//field reducers
import {
  CREATE_FIELD,
  READ_FIELD_ALL,
  READ_FIELD_OBJ,
  READ_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  READ_LOADING_FIELD,
  WRITE_LOADING_FIELD,
  SET_FIELD_ERROR
} from "../types";

const initialState = {
  readLoading: false,
  writeLoading: false,
  error: {},
  fields: [],
  field: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_FIELD_ALL:
      return {
        ...state,
        readLoading: false,
        fields: action.payload,
        error: {}
      };
    case READ_FIELD_OBJ:
      return {
        ...state,
        readLoading: false,
        fields: action.payload,
        error: {}
      };
    case READ_FIELD:
      return {
        ...state,
        readLoading: false,
        field: action.payload,
        error: {}
      };
    case CREATE_FIELD:
      return {
        ...state,
        writeLoading: false,
        fields: [...state.fields, action.payload],
        error: {}
      };
    case DELETE_FIELD:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case UPDATE_FIELD:
      return {
        ...state,
        writeLoading: false,
        error: {}
      };
    case READ_LOADING_FIELD:
      return {
        ...state,
        readLoading: true,
        error: {}
      };
    case WRITE_LOADING_FIELD:
      return {
        ...state,
        writeLoading: true,
        error: {}
      };
    case SET_FIELD_ERROR:
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
