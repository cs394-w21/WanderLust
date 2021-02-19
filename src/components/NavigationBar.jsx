import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const useClass = makeStyles((theme) =>({
  root: {
    width: "100vw",
    backgroundColor: "#757de8",
    variant: "white",
    height:"60px",
  },
  label: {
    color: fade(theme.palette.common.white, 0.50),
    "&$selected": {
      color: "white"
    },
  },
  selected: {
  },
}));



export default function SimpleBottomNavigation() {
  const classes = useClass();
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
      <BottomNavigationAction classes={classes} className={classes.label} label="Explore" icon={<ExploreIcon/>} />
      <BottomNavigationAction classes={classes} className={classes.label} label="Trips" icon={<CardTravelIcon />} />
      <BottomNavigationAction classes={classes} className={classes.label} label="Camera" icon={<AddAPhotoIcon />} />
    </BottomNavigation>
  );
}
