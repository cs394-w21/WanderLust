import React from "react";
import Map from "../components/Map";
import Flex from "../components/Flex";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MapPage = () => {

  return (
    <Flex width='100%' alignItems='center' flexDirection='column' padding='25px'>
    <Typography variant='h6'>
      The World at your Finger Tips
    </Typography>
    <Map />
    <Flex alignItems='center' flexDirection='row' padding='5px'>
    <Flex padding='5px'>
        <Button variant="contained" color="primary">
          Create New Trip
        </Button>
    </Flex>   
    <Flex padding='5px'>     
        <Button variant="contained" color="primary">
          View New Trip
        </Button>
    </Flex>
    </Flex>
  </Flex>
  

  )
};

export default MapPage;