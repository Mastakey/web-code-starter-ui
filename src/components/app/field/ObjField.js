import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import PaperList from "../../view/PaperList";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class ObjField extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <Fragment>
        <PaperList reference={`field`} list={fields} title={`Fields`} />
      </Fragment>
    );
  }
}

ObjField.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(ObjField));
