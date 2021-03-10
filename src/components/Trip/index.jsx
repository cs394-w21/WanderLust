import React from "react";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import { useWindowSize } from "@react-hook/window-size";
import useNavbar from "../../utils/useNavbarContext.js";
import { useModalStyles } from "../../utils/popupStyles";
import TripRouter from "./Router";

const getPaperWidth = (width) => {
  if (width > 500) return 400;
  if (width > 350) return width / 2;
  return width - 90;
};

const TripOverlay = () => {
  const { currentTab } = useNavbar();
  const [activeTrip, setCurrentTrip] = React.useState(null);
  const modalClasses = useModalStyles();
  const [width, height] = useWindowSize();
  return (
    <Fade in={currentTab === "Trips"}>
      <Paper
        className={modalClasses.paper}
        style={{
          width: getPaperWidth(width),
          minHeight: Math.min(250, height - 240),
          maxHeight: height - 240,
          overflowY: "scroll",
        }}
        elevation={4}
      >
        <TripRouter activeTrip={activeTrip} setCurrentTrip={setCurrentTrip} />
      </Paper>
    </Fade>
  );
};

export default TripOverlay;
