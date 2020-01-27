import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createObj } from "../../redux/actions/objActions";

//Components
import CreateObj from "../../components/app/obj/CreateObj";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class objCreate extends Component {
  async createObj(data) {
    await this.props.createObj(data, this.props.history);
  }
  render() {
    const loading = this.props.obj.loading;
    const error = this.props.obj.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Objs", url: "/obj" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Obj"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateObj
          loading={loading}
          createObj={this.createObj.bind(this)}
          appId={this.props.match.params.id}
          error={error}
        />
      );
    }

    return (
      <Grid container alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {header}
            {body}
            {footer}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

objCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createObj: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  obj: state.obj
});

export default connect(mapStateToProps, { createObj })(
  withStyles(styles)(objCreate)
);
