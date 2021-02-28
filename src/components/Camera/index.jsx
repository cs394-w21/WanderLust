import React from "react";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { useWindowWidth } from "@react-hook/window-size";
import useNavbar from "../../utils/useNavbarContext.js";
import Flex from '../../components/Flex';
import { useModalStyles } from "../../utils/popupStyles";

const getPaperWidth = (width) => {
  if (width > 500) return 400;
  if (width > 350) return width / 2;
  return width - 90;
};

const CameraBody = () => {
  const modalClasses = useModalStyles();
  const { closePopup } = useNavbar();
  return (
    <Fade in duration={1000} width="100%">
      <Flex flexDirection="column" width="100%">
        <Flex
          paddingLeft="16px"
          paddingRight="16px"
          paddingBottom="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={modalClasses.header} component="h6">
            My Photos
          </Typography>
          <CancelIcon style={{ cursor: "pointer" }} onClick={closePopup} />
        </Flex>
      </Flex>
    </Fade>
  );
};

const TripOverlay = () => {
  const { currentTab } = useNavbar();
  const modalClasses = useModalStyles();
  const width = useWindowWidth();
  return (
    <Fade in={currentTab === "Camera"}>
      <Paper
        className={modalClasses.paper}
        style={{ width: getPaperWidth(width), minHeight: 250 }}
        elevation={4}
      >
        <CameraBody />
      </Paper>
    </Fade>
  );
};

export default TripOverlay;
