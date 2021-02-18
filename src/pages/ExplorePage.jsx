import React from "react";
import Map from "../components/Map";
import Flex from "../components/Flex";
import SearchBar from "../components/SearchBar";
import NavigationBar from "../components/NavigationBar";
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
      // padding="25px"
    >
      {/* <Typography variant="h6">The World at your Finger Tips</Typography> */}
      <SearchBar/>
      <Map />
      <NavigationBar/>
    </Flex>
  );
};

export default ExplorePage;
