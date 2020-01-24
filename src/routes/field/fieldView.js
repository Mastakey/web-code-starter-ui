import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getField, deleteField } from "../../redux/actions/fieldActions";

//Components
import ViewField from "../../components/app/field/ViewField";
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

class fieldView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getField(id);
  }
  async deleteField() {
    const id = this.props.match.params.id;
    await this.props.deleteField(id, this.props.history);
  }
  render() {
    const field = this.props.field.field;
    const loading = this.props.field.readLoading;
    const error = this.props.field.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Fields", url: "/field" }
        ]}
        currentPage={{ name: field.name, url: "/field" }}
        title={"Fields"}
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
      body = <ViewField field={field} deleteField={this.deleteField.bind(this)} />;
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

fieldView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ field: state.field });

export default connect(mapStateToProps, { getField, deleteField })(
  withStyles(styles)(fieldView)
);
