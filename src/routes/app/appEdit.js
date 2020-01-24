import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getApp, editApp } from "../../redux/actions/appActions";

//Components
import EditApp from "../../components/app/app/EditApp";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  },
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  saveButton: {
    marginRight: "20px",
    width: "100px"
  }
};

class appEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          apiUrl: "",
        databaseURL: "",

    };
  }
  async componentDidMount() {
    await this.props.getApp(this.props.match.params.id);
    const app = this.props.app.app;
    const errors = this.props.app.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: app.name,
        description: app.description,
        descriptionDelta: app.descriptionDelta,
      apiUrl: app.apiUrl,
      databaseURL: app.databaseURL,

      });
    }
  }
  async editApp(data) {
    await this.props.editApp(
      this.props.match.params.id,
      data,
      this.props.history
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  handleSave = async event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      descriptionDelta: this.state.descriptionDelta,
      apiUrl: this.state.apiUrl,
      databaseURL: this.state.databaseURL,

    };
    await this.props.editApp(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.app.readLoading;
    const saveLoading = this.props.app.writeLoading;
    const error = this.props.app.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Apps", url: "/app" },
          { name: this.state.name, url: `/app/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Apps"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditApp
          handleSave={this.handleSave.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleQuillChange={this.handleQuillChange.bind(this)}
          id={this.props.match.params.id}
          loading={saveLoading}
          state={this.state}
          error={error}
        />
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

appEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getApp: PropTypes.func.isRequired,
  editApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps, { getApp, editApp })(
  withStyles(styles)(appEdit)
);
