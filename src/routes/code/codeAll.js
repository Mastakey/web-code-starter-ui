import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getCodes } from "../../redux/actions/codeActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllCode from "../../components/app/code/AllCode";
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

class codeAll extends Component {
  async componentDidMount() {
    this.props.getCodes();
  }
  render() {
    const classes = this.props.classes;
    const codes = this.props.code.codes;
    const loading = this.props.code.readLoading;
    const error = this.props.code.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Codes", url: "/code" }}
        title={"Codes"}
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
            <AllCode codes={codes} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/code/create`}>
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

codeAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getCodes: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  code: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps, {
  getCodes,
  addMessage
})(withStyles(styles)(codeAll));
