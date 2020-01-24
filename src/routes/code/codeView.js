import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getCode, deleteCode } from "../../redux/actions/codeActions";

//Components
import ViewCode from "../../components/app/code/ViewCode";
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

class codeView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getCode(id);
  }
  async deleteCode() {
    const id = this.props.match.params.id;
    await this.props.deleteCode(id, this.props.history);
  }
  render() {
    const code = this.props.code.code;
    const loading = this.props.code.readLoading;
    const error = this.props.code.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Codes", url: "/code" }
        ]}
        currentPage={{ name: code.name, url: "/code" }}
        title={"Codes"}
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
      body = <ViewCode code={code} deleteCode={this.deleteCode.bind(this)} />;
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

codeView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ code: state.code });

export default connect(mapStateToProps, { getCode, deleteCode })(
  withStyles(styles)(codeView)
);
