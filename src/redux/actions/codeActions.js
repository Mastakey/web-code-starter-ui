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
import axios from "axios";

import { addMessageUtil } from "./actionsUtil.js";

export const getCodes = () => async dispatch => {
  dispatch({ type: READ_LOADING_CODE });
  try {
    const codes = await axios.get("/code");
    dispatch({ type: READ_CODE_ALL, payload: codes.data });
    return codes;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_CODE_ERROR,
      payload: err.response.data
    });
  }
};

export const getCode = id => async dispatch => {
  dispatch({ type: READ_LOADING_CODE });
  try {
    const code = await axios.get("/code/" + id);
    dispatch({ type: READ_CODE, payload: code.data });
    return code;
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_CODE_ERROR,
      payload: err.response.data
    });
  }
};

export const createCode = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_CODE });
  try {
    const code = await axios.post("/code", data);
    dispatch({ type: CREATE_CODE, payload: code.data });
    addMessageUtil({ message: "Code created successfully", timeout: 4000 }, dispatch);
    history.push(`/code`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_CODE_ERROR,
      payload: err.response.data
    });
  }
};

export const editCode = (id, code, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_CODE });
  try {
    const codeData = await axios.put(`/code/${id}`, code);
    dispatch({
      type: UPDATE_CODE,
      payload: codeData.data
    });
    addMessageUtil(
      { message: "Code updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/code/${id}`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_CODE_ERROR,
      payload: err.response.data
    });
  }
};

export const deleteCode = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_CODE });
  try {
    const code = await axios.delete("/code/" + id);
    dispatch({ type: DELETE_CODE, payload: code.data });
    addMessageUtil(
      { message: "Code deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/code");
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_CODE_ERROR,
      payload: err.response.data
    });
  }
};
