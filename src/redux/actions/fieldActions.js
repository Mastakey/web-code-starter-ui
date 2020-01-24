import {
  CREATE_FIELD,
  READ_FIELD_ALL,
  READ_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  READ_LOADING_FIELD,
  WRITE_LOADING_FIELD,
  SET_FIELD_ERROR
} from "../types";
import axios from "axios";

import { addMessageUtil } from "./actionsUtil.js";

export const getFields = () => async dispatch => {
  dispatch({ type: READ_LOADING_FIELD });
  try {
    const fields = await axios.get("/field");
    dispatch({ type: READ_FIELD_ALL, payload: fields.data });
    return fields;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: err.response.data
    });
  }
};

export const getField = id => async dispatch => {
  dispatch({ type: READ_LOADING_FIELD });
  try {
    const field = await axios.get("/field/" + id);
    dispatch({ type: READ_FIELD, payload: field.data });
    return field;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: err.response.data
    });
  }
};

export const createField = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FIELD });
  try {
    const field = await axios.post("/field", data);
    dispatch({ type: CREATE_FIELD, payload: field.data });
    addMessageUtil({ message: "Field created successfully", timeout: 4000 }, dispatch);
    history.push(`/field`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: err.response.data
    });
  }
};

export const editField = (id, field, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FIELD });
  try {
    const fieldData = await axios.put(`/field/${id}`, field);
    dispatch({
      type: UPDATE_FIELD,
      payload: fieldData.data
    });
    addMessageUtil(
      { message: "Field updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/field/${id}`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: err.response.data
    });
  }
};

export const deleteField = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FIELD });
  try {
    const field = await axios.delete("/field/" + id);
    dispatch({ type: DELETE_FIELD, payload: field.data });
    addMessageUtil(
      { message: "Field deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/field");
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: err.response.data
    });
  }
};