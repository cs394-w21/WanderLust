import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { useWindowWidth } from "@react-hook/window-size";
import useNavbar from "../../utils/useNavbarContext.js";
import Flex from '../../components/Flex';
import { useModalStyles } from "../../utils/popupStyles";
import ImageUploader from 'react-images-upload';
import { GoogleMap, Autocomplete, useGoogleMap } from "@react-google-maps/api";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const getPaperWidth = (width) => {
  if (width > 500) return 400;
  if (width > 350) return width / 2;
  return width - 90;
};



const Picture = () => {
  const [picture, setPicture] = useState(null);
  
  console.log(picture);

  /*
    1. Choose Picture
    2. Add location search
    3. Add Description/Activity Type
    4. Make it a form
    5. Use that data to add to map
  */

  return (
    <ImageUploader 
      withIcon={true}
      buttonText='Choose image'
      onChange={setPicture}
      withPreview={true}
      label='Max File Size: 5mb, Accepted: jpg, png'
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
    />
  )
}






const CreateCameraForm = (props) => {

  return (
    <Formik >
      <Form>
        <Flex flexDirection="column">
          <AddPictureFields />
        </Flex>
      </Form>
    </Formik>
  )
}

const AddPictureFields = () => {
  return (
    <>
      <Picture />
      <Flex justifyContent="center"> {/*make this a form*/} 
        <LocationSearch/>
      </Flex>
    </>
  )
}

const LocationSearch = () => {
  const [autocomplete, setAutocomplete] = React.useState(3);
  const map = useGoogleMap();
  if (!autocomplete) return null;
  return (
    <Autocomplete
      onLoad={setAutocomplete}
    >
      <input
        type="text"
        placeholder="Search for Location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </Autocomplete>
  );
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
        <CreateCameraForm />
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
