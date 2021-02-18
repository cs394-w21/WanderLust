import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height:"8vh",
    backgroundColor: "#757de8",
    variant: "white",
    minHeight:"60px",
  },
  navItem: {
    color: "white",
    "&$selected": {
      color: "black"
    },
  },
  selected: {
  },
});



export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction classes={classes} className={classes.navItem} label="Explore" icon={<ExploreIcon/>} />
      <BottomNavigationAction classes={classes} className={classes.navItem} label="Trips" icon={<CardTravelIcon />} />
      <BottomNavigationAction classes={classes} className={classes.navItem} label="Camera" icon={<AddAPhotoIcon />} />
    </BottomNavigation>
  );
}
