import React from "react";
import Map from "../components/Map";
import Flex from "../components/Flex";
import SearchBar from "../components/SearchBar";
import NavigationBar from "../components/NavigationBar";
import { useWindowHeight } from "@react-hook/window-size";

const ExplorePage = () => {
  const height = useWindowHeight();
  return (
    <Flex width="100%" alignItems="center" flexDirection="column" height="100%">
      <SearchBar />
      <Flex width="100%" height={`${height - 124}px`}>
        <Map />
      </Flex>
      <NavigationBar />
    </Flex>
  );
};

export default ExplorePage;
