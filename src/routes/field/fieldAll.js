import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getFields } from "../../redux/actions/fieldActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllField from "../../components/app/field/AllField";
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

class fieldAll extends Component {
  async componentDidMount() {
    this.props.getFields();
  }
  render() {
    const classes = this.props.classes;
    const fields = this.props.field.fields;
    const loading = this.props.field.readLoading;
    const error = this.props.field.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Fields", url: "/field" }}
        title={"Fields"}
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
            <AllField fields={fields} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={`/field/create`}>
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

fieldAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getFields: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, {
  getFields,
  addMessage
})(withStyles(styles)(fieldAll));
