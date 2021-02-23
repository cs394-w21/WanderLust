import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import W from "./W.svg";

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

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <img
            style={{ maxWidth: "50px", maxHeight: "50px" }}
            src={W}
            alt="Logo"
          />
          <Typography className={classes.title} variant="h6" noWrap>
            anderLust
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
