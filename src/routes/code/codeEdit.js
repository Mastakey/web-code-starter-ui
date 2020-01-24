import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getCode, editCode } from "../../redux/actions/codeActions";

//Components
import EditCode from "../../components/app/code/EditCode";
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

class codeEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          appId: "",
        objId: "",
        code: "",
        folder: "",
        type: "",

    };
  }
  async componentDidMount() {
    await this.props.getCode(this.props.match.params.id);
    const code = this.props.code.code;
    const errors = this.props.code.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: code.name,
        description: code.description,
        descriptionDelta: code.descriptionDelta,
      appId: code.appId,
      objId: code.objId,
      code: code.code,
      folder: code.folder,
      type: code.type,

      });
    }
  }
  async editCode(data) {
    await this.props.editCode(
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
      appId: this.state.appId,
      objId: this.state.objId,
      code: this.state.code,
      folder: this.state.folder,
      type: this.state.type,

    };
    await this.props.editCode(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.code.readLoading;
    const saveLoading = this.props.code.writeLoading;
    const error = this.props.code.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Codes", url: "/code" },
          { name: this.state.name, url: `/code/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Codes"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditCode
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

codeEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getCode: PropTypes.func.isRequired,
  editCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  code: state.code
});

export default connect(mapStateToProps, { getCode, editCode })(
  withStyles(styles)(codeEdit)
);
