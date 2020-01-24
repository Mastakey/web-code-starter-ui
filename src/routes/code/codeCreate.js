import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createCode } from "../../redux/actions/codeActions";

//Components
import CreateCode from "../../components/app/code/CreateCode";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class codeCreate extends Component {
  async createCode(data) {
    await this.props.createCode(data, this.props.history);
  }
  render() {
    const loading = this.props.code.loading;
    const error = this.props.code.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Codes", url: "/code" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Code"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateCode
          loading={loading}
          createCode={this.createCode.bind(this)}
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

codeCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps, { createCode })(
  withStyles(styles)(codeCreate)
);
