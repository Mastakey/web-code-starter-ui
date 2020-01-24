import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllApp extends Component {
  render() {
    const apps = this.props.apps;
    return (
      <Fragment>
        {apps &&
          apps.length > 0 &&
          apps.map(app => {
            if (app.status !== "done") {
              const topHeader = app.username;
              const title = app.name;
              const subTitle = app.status;
              const content = "";
              const link = {
                title: "Open App",
                url: `/app/${app.id}`
              };
              return (
                <SimpleCard
                  key={app.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={app.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllApp.propTypes = {
  classes: PropTypes.object.isRequired,
  apps: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllApp));
