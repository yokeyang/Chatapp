import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class Nofig extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onRequestClose={this.props.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.msg}</span>}
          action={[
            <Button key="undo" color="accent" dense onClick={this.props.handleRequestClose}>
              Ok
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.props.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

Nofig.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nofig);
