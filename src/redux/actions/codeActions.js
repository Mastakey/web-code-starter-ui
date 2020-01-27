import {
  CREATE_CODE,
  CREATE_CODES,
  READ_CODE_ALL,
  READ_CODE_APP,
  READ_CODE,
  UPDATE_CODE,
  DELETE_CODE,
  DELETE_CODES,
  READ_LOADING_CODE,
  WRITE_LOADING_CODE,
  SET_CODE_ERROR
} from "../types";
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getCodes = () => async dispatch => {
  dispatch({ type: READ_LOADING_CODE });
  try {
    const codes = await axios.get("/code");
    dispatch({ type: READ_CODE_ALL, payload: codes.data });
    return codes;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
    });
  }
};

export const getCodesByApp = (appId) => async dispatch => {
  dispatch({ type: READ_LOADING_CODE });
  try {
    const codes = await axios.get("/app/"+appId+"/code");
    dispatch({ type: READ_CODE_APP, payload: codes.data });
    return codes;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
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
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
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
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
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
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
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
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
    });
  }
};

export const deleteCodesByApp = (appId) => async dispatch => {
  dispatch({ type: WRITE_LOADING_CODE });
  try {
    const code = await axios.delete("/app/" + appId + "/code");
    dispatch({ type: DELETE_CODES, payload: code.data });
    addMessageUtil(
      { message: "Codes deleted successfully", timeout: 4000 },
      dispatch
    );
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
    });
  }
}

export const createCodesByApp = (appId) => async dispatch => {
  dispatch({ type: WRITE_LOADING_CODE });
  try {
    const code = await axios.post("/app/" + appId + "/code", {});
    dispatch({ type: CREATE_CODES, payload: code.data });
    addMessageUtil(
      { message: "Codes created successfully", timeout: 4000 },
      dispatch
    );
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_CODE_ERROR,
      payload: errors
    });
  }
}
