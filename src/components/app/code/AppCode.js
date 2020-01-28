import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import FileView from "../../view/FileView";
import DeleteDialog from "../../../components/dialog/DeleteDialog";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

//Material Icons
import DeleteIcon from "@material-ui/icons/Delete";
import CodeIcon from "@material-ui/icons/Code";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px",
    marginRight: "10px"
  },
  fabDelete: {
    float: "right"
  }
};

class AppCode extends Component {
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

  async handleGenerateCode() {
    await this.props.createCodes();
  }

  handleDownloadCode(){
    this.props.downloadCodes();
  }

  handleDeleteDialogClose() {
    this.setState({
      showDeleteDialog: false
    });
  }
  async handleDeleteDialogDelete(){
    this.setState({
      showDeleteDialog: false
    });
    await this.props.deleteCodes();
  }
  render() {
    const codes = this.props.codes;
    const classes = this.props.classes;
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
              deleteFunction={this.handleDeleteDialogDelete.bind(this)}
              open={this.state.showDeleteDialog}
              handleClose={this.handleDeleteDialogClose.bind(this)}
            />
            <Typography variant="h5">Codes</Typography>
            <FileView list={codes} />
            <Fab
              className={classes.fab}
              size="small"
              color="primary"
              onClick={this.handleGenerateCode.bind(this)}
            >
              <CodeIcon />
            </Fab>
            <Fab
              className={classes.fab}
              size="small"
              color="primary"
              onClick={this.handleDownloadCode.bind(this)}
            >
              <CloudDownloadIcon />
            </Fab>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

AppCode.propTypes = {
  classes: PropTypes.object.isRequired,
  codes: PropTypes.array.isRequired,
  deleteCodes: PropTypes.func.isRequired,
  createCodes: PropTypes.func.isRequired,
  downloadCodes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(AppCode));
