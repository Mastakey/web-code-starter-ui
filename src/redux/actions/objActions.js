import {
  CREATE_OBJ,
  READ_OBJ_ALL,
  READ_OBJ,
  UPDATE_OBJ,
  DELETE_OBJ,
  READ_LOADING_OBJ,
  WRITE_LOADING_OBJ,
  SET_OBJ_ERROR
} from "../types";
import axios from "axios";

import { addMessageUtil } from "./actionsUtil.js";

export const getObjs = () => async dispatch => {
  dispatch({ type: READ_LOADING_OBJ });
  try {
    const objs = await axios.get("/obj");
    dispatch({ type: READ_OBJ_ALL, payload: objs.data });
    return objs;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_OBJ_ERROR,
      payload: err.response.data
    });
  }
};

export const getObj = id => async dispatch => {
  dispatch({ type: READ_LOADING_OBJ });
  try {
    const obj = await axios.get("/obj/" + id);
    dispatch({ type: READ_OBJ, payload: obj.data });
    return obj;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_OBJ_ERROR,
      payload: err.response.data
    });
  }
};

export const createObj = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_OBJ });
  try {
    const obj = await axios.post("/obj", data);
    dispatch({ type: CREATE_OBJ, payload: obj.data });
    addMessageUtil({ message: "Obj created successfully", timeout: 4000 }, dispatch);
    history.push(`/obj`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_OBJ_ERROR,
      payload: err.response.data
    });
  }
};

export const editObj = (id, obj, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_OBJ });
  try {
    const objData = await axios.put(`/obj/${id}`, obj);
    dispatch({
      type: UPDATE_OBJ,
      payload: objData.data
    });
    addMessageUtil(
      { message: "Obj updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/obj/${id}`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_OBJ_ERROR,
      payload: err.response.data
    });
  }
};

export const deleteObj = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_OBJ });
  try {
    const obj = await axios.delete("/obj/" + id);
    dispatch({ type: DELETE_OBJ, payload: obj.data });
    addMessageUtil(
      { message: "Obj deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/obj");
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_OBJ_ERROR,
      payload: err.response.data
    });
  }
};
