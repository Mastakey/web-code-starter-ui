import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/nav/Navbar";
import Alerts from "./components/alerts/Alerts";

//Routes
import Home from "./routes/Home";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signup from "./routes/Signup";

//Code
import codeAll from "./routes/code/codeAll";
import codeView from "./routes/code/codeView";
import codeCreate from "./routes/code/codeCreate";
import codeEdit from "./routes/code/codeEdit";//Field
import fieldAll from "./routes/field/fieldAll";
import fieldView from "./routes/field/fieldView";
import fieldCreate from "./routes/field/fieldCreate";
import fieldEdit from "./routes/field/fieldEdit";//Obj
import objAll from "./routes/obj/objAll";
import objView from "./routes/obj/objView";
import objCreate from "./routes/obj/objCreate";
import objEdit from "./routes/obj/objEdit";//App
import appAll from "./routes/app/appAll";
import appView from "./routes/app/appView";
import appCreate from "./routes/app/appCreate";
import appEdit from "./routes/app/appEdit";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTH } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

//Auth
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-web-code-starter.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    //window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/code" component={codeAll} />
              <Route exact path="/code/create" component={codeCreate} />
              <Route exact path="/code/:id" component={codeView} />
              <Route exact path="/code/edit/:id" component={codeEdit} />
              <Route exact path="/field" component={fieldAll} />
              <Route exact path="/field/create" component={fieldCreate} />
              <Route exact path="/field/:id" component={fieldView} />
              <Route exact path="/field/edit/:id" component={fieldEdit} />
              <Route exact path="/obj" component={objAll} />
              <Route exact path="/obj/create" component={objCreate} />
              <Route exact path="/obj/:id" component={objView} />
              <Route exact path="/obj/edit/:id" component={objEdit} />
              <Route exact path="/app" component={appAll} />
              <Route exact path="/app/create" component={appCreate} />
              <Route exact path="/app/:id" component={appView} />
              <Route exact path="/app/edit/:id" component={appEdit} />
  
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
