import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getObj, deleteObj } from "../../redux/actions/objActions";

//Components
import ViewObj from "../../components/app/obj/ViewObj";
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

class objView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getObj(id);
  }
  async deleteObj() {
    const id = this.props.match.params.id;
    await this.props.deleteObj(id, this.props.history);
  }
  render() {
    const obj = this.props.obj.obj;
    const loading = this.props.obj.readLoading;
    const error = this.props.obj.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Objs", url: "/obj" }
        ]}
        currentPage={{ name: obj.name, url: "/obj" }}
        title={"Objs"}
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
      body = <ViewObj obj={obj} deleteObj={this.deleteObj.bind(this)} />;
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

objView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteObj: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ obj: state.obj });

export default connect(mapStateToProps, { getObj, deleteObj })(
  withStyles(styles)(objView)
);
