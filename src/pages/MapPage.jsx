import React from "react";
import Map from "../components/Map";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MapPage = () => {

  return (
    <Box display='flex' component='div' width='100%' alignItems='center' flexDirection='column' padding='25px'>
    <Typography variant='h6'>
      The World at your Finger Tips
    </Typography>
    <Map />
    <Box display='flex' component='div' alignItems='center' flexDirection='row' padding='5px'>
    <Box display='flex' component='div' padding='5px'>
        <Button variant="contained" color="primary">
          Create New Trip
        </Button>
    </Box>   
    <Box display='flex' component='div' padding='5px'>     
        <Button variant="contained" color="primary">
          View New Trip
        </Button>
    </Box>
    </Box>
  </Box>
  

  )
};

export default MapPage;