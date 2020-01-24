import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getObjs } from "../../redux/actions/objActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllObj from "../../components/app/obj/AllObj";
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

class objAll extends Component {
  async componentDidMount() {
    this.props.getObjs();
  }
  render() {
    const classes = this.props.classes;
    const objs = this.props.obj.objs;
    const loading = this.props.obj.readLoading;
    const error = this.props.obj.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Objs", url: "/obj" }}
        title={"Objs"}
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
            <AllObj objs={objs} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/obj/create`}>
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

objAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getObjs: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  obj: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  obj: state.obj
});

export default connect(mapStateToProps, {
  getObjs,
  addMessage
})(withStyles(styles)(objAll));
