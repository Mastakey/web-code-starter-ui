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
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getFields = () => async dispatch => {
  dispatch({ type: READ_LOADING_FIELD });
  try {
    const fields = await axios.get("/field");
    dispatch({ type: READ_FIELD_ALL, payload: fields.data });
    return fields;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: errors
    });
  }
};

export const getFieldsByObj = objId => async dispatch => {
  dispatch({ type: READ_LOADING_FIELD });
  try {
    const fields = await axios.get("/obj/" + objId + "/field");
    dispatch({ type: READ_FIELD_OBJ, payload: fields.data });
    return fields;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: errors
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
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: errors
    });
  }
};

export const createField = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FIELD });
  try {
    const field = await axios.post("/field", data);
    const objId = data.objId;
    dispatch({ type: CREATE_FIELD, payload: field.data });
    addMessageUtil(
      { message: "Field created successfully", timeout: 4000 },
      dispatch
    );
    if (objId && objId !== "") {
      history.push(`/obj/${objId}`);
    } else {
      history.push(`/field`);
    }
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: errors
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
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: errors
    });
  }
};

export const deleteField = (id, objId, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_FIELD });
  try {
    const field = await axios.delete("/field/" + id);
    dispatch({ type: DELETE_FIELD, payload: field.data });
    addMessageUtil(
      { message: "Field deleted successfully", timeout: 4000 },
      dispatch
    );
    if (objId && objId !== "") {
      history.push(`/obj/${objId}`);
    } else {
      history.push(`/field`);
    }
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_FIELD_ERROR,
      payload: errors
    });
  }
};
