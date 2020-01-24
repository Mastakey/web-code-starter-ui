import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class AllField extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <Fragment>
        {fields &&
          fields.length > 0 &&
          fields.map(field => {
            if (field.status !== "done") {
              const topHeader = field.username;
              const title = field.name;
              const subTitle = field.status;
              const content = "";
              const link = {
                title: "Open Field",
                url: `/field/${field.id}`
              };
              return (
                <SimpleCard
                  key={field.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={field.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

AllField.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AllField));
