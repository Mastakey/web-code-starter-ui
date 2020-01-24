import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getObj, editObj } from "../../redux/actions/objActions";

//Components
import EditObj from "../../components/app/obj/EditObj";
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

class objEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
          appId: "",

    };
  }
  async componentDidMount() {
    await this.props.getObj(this.props.match.params.id);
    const obj = this.props.obj.obj;
    const errors = this.props.obj.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: obj.name,
        description: obj.description,
        descriptionDelta: obj.descriptionDelta,
      appId: obj.appId,

      });
    }
  }
  async editObj(data) {
    await this.props.editObj(
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

    };
    await this.props.editObj(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.obj.readLoading;
    const saveLoading = this.props.obj.writeLoading;
    const error = this.props.obj.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Objs", url: "/obj" },
          { name: this.state.name, url: `/obj/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Objs"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditObj
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

objEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getObj: PropTypes.func.isRequired,
  editObj: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  obj: state.obj
});

export default connect(mapStateToProps, { getObj, editObj })(
  withStyles(styles)(objEdit)
);
