import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Components
import GridList from "../../view/GridList";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

//Material Icons
import AddIcon from "@material-ui/icons/Add";
const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "20px"
  }
};

class ObjField extends Component {
  render() {
    const classes = this.props.classes;
    const fields = this.props.fields;
    const objId = this.props.objId;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6">Fields</Typography>
            <GridList reference={`field`} list={fields} />
            <Link to={`/obj/${objId}/field/create`}>
              <Fab size="small" color="default" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ObjField.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  objId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(ObjField));
