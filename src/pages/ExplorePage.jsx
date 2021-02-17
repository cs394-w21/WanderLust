import React from "react";
import Map from "../components/Map";
import Flex from "../components/Flex";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Instagram from "@material-ui/icons/Instagram";
import Facebook from "@material-ui/icons/Facebook";

const ExplorePage = () => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      flexDirection="column"
      padding="25px"
    >
      <Typography variant="h6">The World at your Finger Tips</Typography>
      <Map />
      <Flex alignItems="center" flexDirection="row" padding="5px">
        <Flex padding="5px">
          <Button variant="contained" color="primary">
            Create New Trip
          </Button>
        </Flex>
        <Flex padding="5px">
          <Button variant="contained" color="primary">
            View New Trip
          </Button>
        </Flex>
      </Flex>
      <Flex alignItems="center" flexDirection="row" padding="5px">
        <Instagram fontSize="large" />
        <Facebook fontSize="large" />
      </Flex>
    </Flex>
  );
};

export default ExplorePage;
