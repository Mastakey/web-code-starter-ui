import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getApp, deleteApp } from "../../redux/actions/appActions";

//Components
import ViewApp from "../../components/app/app/ViewApp";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  }
};

class appView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getApp(id);
  }
  async deleteApp() {
    const id = this.props.match.params.id;
    await this.props.deleteApp(id, this.props.history);
  }
  render() {
    const app = this.props.app.app;
    const loading = this.props.app.readLoading;
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
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = <ViewApp app={app} deleteApp={this.deleteApp.bind(this)} />;
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
  deleteApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps, { getApp, deleteApp })(
  withStyles(styles)(appView)
);
