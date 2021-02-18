import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CardTravelIcon from '@material-ui/icons/CardTravel';

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "#757de8",
    variant: "white"
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
      <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
      <BottomNavigationAction label="Trips" icon={<CardTravelIcon />} />
      <BottomNavigationAction label="Camera" icon={<AddAPhotoIcon />} />
      
    </BottomNavigation>
  );
}