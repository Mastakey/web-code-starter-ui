import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Components
import DeleteDialog from "../../../components/dialog/DeleteDialog";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

//Material Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px"
  },
  fabDelete: {
    float: "right"
  }
};

class ViewObj extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteDialog: false
    };
  }
  handleDelete() {
    this.setState({
      showDeleteDialog: true
    });
  }
  handleDeleteDialogClose() {
    this.setState({
      showDeleteDialog: false
    });
  }
  render() {
    const classes = this.props.classes;
    const obj = this.props.obj;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <Fab
                size="small"
                color="secondary"
                className={classes.fabDelete}
                onClick={this.handleDelete.bind(this)}
              >
                <DeleteIcon />
              </Fab>
              <DeleteDialog
                deleteFunction={this.props.deleteObj}
                open={this.state.showDeleteDialog}
                handleClose={this.handleDeleteDialogClose.bind(this)}
              />
              <Typography variant="h5">{obj.name}</Typography>
              <Typography variant="body1">
                <span
                  dangerouslySetInnerHTML={{
                    __html: obj.description
                  }}
                />
              </Typography>
              <Typography variant="body1">{obj.assignee}</Typography>
              <Typography variant="body1">{obj.details}</Typography>
              <Typography variant="body1">{obj.status}</Typography>
              <Typography variant="body1">{obj.priority}</Typography>
              <Link to={`/obj/edit/${obj.id}`}>
                <Fab size="small" color="default" className={classes.fab}>
                  <EditIcon />
                </Fab>
              </Link>
            </Paper>
        </Grid>
      </Grid>
    );
  }
}

ViewObj.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteObj: PropTypes.func.isRequired,
  obj: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(ViewObj));
