import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getField, editField } from "../../redux/actions/fieldActions";

//Components
import EditField from "../../components/app/field/EditField";
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

class fieldEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          type: "",
        objId: "",

    };
  }
  async componentDidMount() {
    await this.props.getField(this.props.match.params.id);
    const field = this.props.field.field;
    const errors = this.props.field.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: field.name,
        description: field.description,
        descriptionDelta: field.descriptionDelta,
      type: field.type,
      objId: field.objId,

      });
    }
  }
  async editField(data) {
    await this.props.editField(
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
      type: this.state.type,
      objId: this.state.objId,

    };
    await this.props.editField(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.field.readLoading;
    const saveLoading = this.props.field.writeLoading;
    const error = this.props.field.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Fields", url: "/field" },
          { name: this.state.name, url: `/field/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Fields"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditField
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

fieldEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getField: PropTypes.func.isRequired,
  editField: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  field: state.field
});

export default connect(mapStateToProps, { getField, editField })(
  withStyles(styles)(fieldEdit)
);
