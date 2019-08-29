import React from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from "@material-ui/core/styles";

const HeaderDropDownStyle = theme => ({
  dropdownRoot: {
    position: "relative"
  },
  dropdownButton: {
    fontSize: ".7rem",
    whiteSpace: "nowrap",
    font: theme.typography.fontFamily,
  },
  dropdownPaper: {
    position: "absolute",
    top: "100",
    right: "0",
    left: "0",
  },
  dropdownLabel: {
    marginTop: ".5rem",
    padding: "0 .2rem .5rem .5rem",
    font: theme.typography.fontFamily,
    fontSize: ".7rem",
    fontWeight: 250,
    color: "black",
  },
  dropdownLabelLink: {
      textDecoration: "none",
      color: "black"
  }
});

class HeaderDropDown extends React.Component {
  state = {
    open: false
  };

  toggleDropdown = () => {
    this.setState({ open: true });
  }

  hideDropDown = (e) => {
    if (e && e.relatedTarget) {
      e.relatedTarget.click();
    }
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.dropdownRoot}>
        <ClickAwayListener onClickAway={this.hideDropDown}>
          <div>
            <Button 
            className={classes.dropdownButton}
            onClick={this.toggleDropdown}>User Section <ArrowDropDownIcon /></Button>
            {open ? (
              <Paper className={classes.dropdownPaper}>
              <div className={classes.dropdownLabel}>
              <Link className={classes.dropdownLabelLink} to="/profile">User Profile</Link>
          </div>
                <div className={classes.dropdownLabel}>
                    <Link 
                    className={classes.dropdownLabelLink}
                    to="/lists">Shopping Lists</Link>
                </div>
              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

export default withStyles(HeaderDropDownStyle)(HeaderDropDown);
