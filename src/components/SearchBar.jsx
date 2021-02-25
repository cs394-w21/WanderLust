import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import W from "./Wanderlust.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100vw",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    height: "60px",
  },
}));

const SearchAppBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <img
            style={{ maxWidth: "185px", paddingBottom: '10px' }}
            src={W}
            alt="Logo"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SearchAppBar;
