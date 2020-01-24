import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createApp } from "../../redux/actions/appActions";

//Components
import CreateApp from "../../components/app/app/CreateApp";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class appCreate extends Component {
  async createApp(data) {
    await this.props.createApp(data, this.props.history);
  }
  render() {
    const loading = this.props.app.loading;
    const error = this.props.app.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Apps", url: "/app" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create App"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateApp
          loading={loading}
          createApp={this.createApp.bind(this)}
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

appCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps, { createApp })(
  withStyles(styles)(appCreate)
);
