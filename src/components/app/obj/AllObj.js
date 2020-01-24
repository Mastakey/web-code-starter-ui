import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllObj extends Component {
  render() {
    const objs = this.props.objs;
    return (
      <Fragment>
        {objs &&
          objs.length > 0 &&
          objs.map(obj => {
            if (obj.status !== "done") {
              const topHeader = obj.username;
              const title = obj.name;
              const subTitle = obj.status;
              const content = "";
              const link = {
                title: "Open Obj",
                url: `/obj/${obj.id}`
              };
              return (
                <SimpleCard
                  key={obj.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={obj.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllObj.propTypes = {
  classes: PropTypes.object.isRequired,
  objs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllObj));
