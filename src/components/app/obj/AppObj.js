import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import PaperList from "../../view/PaperList";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AppObj extends Component {
  render() {
    const objs = this.props.objs;
    return (
      <Fragment>
        <PaperList reference={`obj`} list={objs} title={`Objects`} />
      </Fragment>
    );
  }
}

AppObj.propTypes = {
  classes: PropTypes.object.isRequired,
  objs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AppObj));
