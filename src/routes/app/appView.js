import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getApp, deleteApp } from "../../redux/actions/appActions";
import { getObjsByApp } from "../../redux/actions/objActions";
import {
  getCodesByApp,
  deleteCodesByApp,
  createCodesByApp
} from "../../redux/actions/codeActions";

//Components
import ViewApp from "../../components/app/app/ViewApp";
import AppObj from "../../components/app/obj/AppObj";
import AppCode from "../../components/app/code/AppCode";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

//Zip
import JSZip from "jszip";
import { saveAs } from "file-saver";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  }
};

class appView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getApp(id);
    this.props.getObjsByApp(id);
    this.props.getCodesByApp(id);
  }
  async deleteApp() {
    const id = this.props.match.params.id;
    await this.props.deleteApp(id, this.props.history);
  }
  async deleteCodes() {
    const id = this.props.match.params.id;
    await this.props.deleteCodesByApp(id);
  }
  async createCodes() {
    const id = this.props.match.params.id;
    await this.props.createCodesByApp(id);
  }

  downloadCodes() {
    var zip = new JSZip();
    const appName = this.props.app.app.name;
    const codes = this.props.code.codes;
    codes.forEach(code => {
      zip.file(`${code.folder}/${code.name}`, code.code);
    });
    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, `${appName}.zip`);
    });
  }

  render() {
    const app = this.props.app.app;
    const appId = this.props.match.params.id;
    const objs = this.props.obj.objs;
    const codes = this.props.code.codes;
    const loading = this.props.app.readLoading;
    const objsLoading = this.props.obj.readLoading;
    const codesLoading = this.props.code.readLoading;
    const error = this.props.app.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Apps", url: "/app" }
        ]}
        currentPage={{ name: app.name, url: "/app" }}
        title={"Apps"}
      />
    );
    let body;
    let footer;
    if (loading || objsLoading || codesLoading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = (
        <Fragment>
          <ViewApp app={app} deleteApp={this.deleteApp.bind(this)} />
          <AppObj objs={objs} appId={appId}/>
          <AppCode
            codes={codes}
            deleteCodes={this.deleteCodes.bind(this)}
            createCodes={this.createCodes.bind(this)}
            downloadCodes={this.downloadCodes.bind(this)}
          />
        </Fragment>
      );
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
          {Object.keys(error).length === 0 && error.constructor === Object ? (
            <Fragment>{body}</Fragment>
          ) : (
            <ErrorHandler error={error} />
          )}
          {footer}
        </Grid>
      </Grid>
    );
  }
}

appView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteApp: PropTypes.func.isRequired,
  getObjsByApp: PropTypes.func.isRequired,
  getCodesByApp: PropTypes.func.isRequired,
  deleteCodesByApp: PropTypes.func.isRequired,
  createCodesByApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app,
  obj: state.obj,
  code: state.code
});

export default connect(mapStateToProps, {
  getApp,
  deleteApp,
  getObjsByApp,
  getCodesByApp,
  deleteCodesByApp,
  createCodesByApp
})(withStyles(styles)(appView));
