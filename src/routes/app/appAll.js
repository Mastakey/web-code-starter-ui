import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getApps } from "../../redux/actions/appActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllApp from "../../components/app/app/AllApp";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

//Material Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  fab: {
    marginTop: "20px"
  }
};

class appAll extends Component {
  async componentDidMount() {
    this.props.getApps();
  }
  render() {
    const classes = this.props.classes;
    const apps = this.props.app.apps;
    const loading = this.props.app.readLoading;
    const error = this.props.app.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Apps", url: "/app" }}
        title={"Apps"}
      />
    );
    let body;
    let footer;
    //loading
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = (
        <Fragment>
          <Grid container item xs={12}>
            <AllApp apps={apps} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/app/create`}>
              <Fab size="small" color="default" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
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

appAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getApps: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps, {
  getApps,
  addMessage
})(withStyles(styles)(appAll));
