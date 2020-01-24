import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllCode extends Component {
  render() {
    const codes = this.props.codes;
    return (
      <Fragment>
        {codes &&
          codes.length > 0 &&
          codes.map(code => {
            if (code.status !== "done") {
              const topHeader = code.username;
              const title = code.name;
              const subTitle = code.status;
              const content = "";
              const link = {
                title: "Open Code",
                url: `/code/${code.id}`
              };
              return (
                <SimpleCard
                  key={code.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={code.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllCode.propTypes = {
  classes: PropTypes.object.isRequired,
  codes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllCode));
