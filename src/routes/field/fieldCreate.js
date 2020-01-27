import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { createField } from "../../redux/actions/fieldActions";

//Components
import CreateField from "../../components/app/field/CreateField";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class fieldCreate extends Component {
  async createField(data) {
    await this.props.createField(data, this.props.history);
  }
  render() {
    const loading = this.props.field.loading;
    const error = this.props.field.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Fields", url: "/field" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create Field"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <CreateField
          loading={loading}
          createField={this.createField.bind(this)}
          objId={this.props.match.params.id}
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

fieldCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  createField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { createField })(
  withStyles(styles)(fieldCreate)
);
