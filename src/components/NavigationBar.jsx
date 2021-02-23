import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import useNavbar from "../utils/useNavbarContext";

const useClass = makeStyles((theme) => ({
  root: {
    width: "100vw",
    backgroundColor: "#757de8",
    variant: "white",
    height: "60px",
  },
  label: {
    color: fade(theme.palette.common.white, 0.5),
    "&$selected": {
      color: "white",
    },
  },
  selected: {},
}));

const SimpleBottomNavigation = () => {
  const classes = useClass();
  const { tabValue, handleTabChange, NavbarConfig } = useNavbar();
  return (
    <BottomNavigation
      value={tabValue}
      onChange={handleTabChange}
      showLabels
      className={classes.root}
    >
      {NavbarConfig.map((navConfig) => (
        <BottomNavigationAction
          classes={classes}
          className={classes.label}
          key={navConfig.label}
          {...navConfig}
        />
      ))}
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation
