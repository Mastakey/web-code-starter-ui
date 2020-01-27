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
import axios from "axios";

import { addMessageUtil, getErrors } from "./actionsUtil.js";

export const getApps = () => async dispatch => {
  dispatch({ type: READ_LOADING_APP });
  try {
    const apps = await axios.get("/app");
    dispatch({ type: READ_APP_ALL, payload: apps.data });
    return apps;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_APP_ERROR,
      payload: errors
    });
  }
};

export const getApp = id => async dispatch => {
  dispatch({ type: READ_LOADING_APP });
  try {
    const app = await axios.get("/app/" + id);
    dispatch({ type: READ_APP, payload: app.data });
    return app;
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_APP_ERROR,
      payload: errors
    });
  }
};

export const createApp = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_APP });
  try {
    const app = await axios.post("/app", data);
    dispatch({ type: CREATE_APP, payload: app.data });
    addMessageUtil(
      { message: "App created successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/app`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_APP_ERROR,
      payload: errors
    });
  }
};

export const editApp = (id, app, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_APP });
  try {
    const appData = await axios.put(`/app/${id}`, app);
    dispatch({
      type: UPDATE_APP,
      payload: appData.data
    });
    addMessageUtil(
      { message: "App updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(`/app/${id}`);
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_APP_ERROR,
      payload: errors
    });
  }
};

export const deleteApp = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_APP });
  try {
    const app = await axios.delete("/app/" + id);
    dispatch({ type: DELETE_APP, payload: app.data });
    addMessageUtil(
      { message: "App deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/app");
  } catch (err) {
    const errors = getErrors(err);
    console.log(err);
    console.log(errors);
    dispatch({
      type: SET_APP_ERROR,
      payload: errors
    });
  }
};
