import React from "react";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { useWindowWidth } from "@react-hook/window-size";
import useNavbar from "../../utils/useNavbarContext.js";
import Flex from "../../components/Flex";
import { useModalStyles } from "../../utils/popupStyles";
import ImageUploader from "react-images-upload";
import { Autocomplete } from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import FormField from "../../components/FormField";
import { Formik, Form, useField } from "formik";
import Alert from "@material-ui/lab/Alert";
import * as Yup from "yup";

const getPaperWidth = (width) => {
  if (width > 500) return 400;
  if (width > 350) return width / 2;
  return width - 90;
};

const Picture = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, meta, helpers] = useField("picture");
  return (
    <>
      <ImageUploader
        withIcon={true}
        buttonText="Choose image"
        onChange={(pictures) => {
          console.log(pictures[0]);
          helpers.setValue(pictures[0]);
          helpers.setTouched(true);
        }}
        withPreview={true}
        label="Max File Size: 5mb, Accepted: jpg, png"
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      {meta.touched && meta.error ? (
        <Alert
          severity="error"
          style={{ marginTop: "2px", marginBottom: "15px" }}
        >
          Please provide a valid picture.
        </Alert>
      ) : null}
    </>
  );
};

const initialValues = {
  picture: null,
  date: "",
  description: "",
  activityType: "",
  locale: {
    lat: "",
    lng: "",
  },
};

const validationSchema = Yup.object().shape({
  picture: Yup.object()
    .shape({
      name: Yup.string().required(),
    })
    .nullable(),
  date: Yup.string().required("Please enter a date"),
  description: Yup.string().required("Please enter a description"),
  activityType: Yup.string().required("Please enter a valid activity type"),
  locale: Yup.object()
    .shape({
      lat: Yup.number().required(),
      lng: Yup.number().required(),
    })
    .required(),
});

const CreateCameraForm = (props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Flex flexDirection="column">
          <AddPictureFields />
        </Flex>
      </Form>
    </Formik>
  );
};

const AddPictureInputs = () => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <LocationSearch />
      <FormField name="date" label="Date" size="small" />
      <Flex py="8px"></Flex>
      <FormField name="description" label="Description" size="small" />
      <Flex py="8px"></Flex>
      <FormField name="activityType" label="Activity Type" size="small" />
      <Flex py="8px"></Flex>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Flex>
  );
};

const AddPictureFields = () => {
  return (
    <>
      <Picture />
      <AddPictureInputs />
    </>
  );
};

const getLatLng = (place) => {
  const location = place?.geometry?.location;
  return {
    lat: location?.lat() || null,
    lng: location?.lng() || null,
  };
};

const LocationSearch = () => {
  const [autocomplete, setAutocomplete] = React.useState(3);
  // eslint-disable-next-line no-unused-vars
  const [_, meta, helpers] = useField("locale");
  if (autocomplete === null) return null;
  return (
    <>
      <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={() => {
          const val = getLatLng(autocomplete.getPlace());
          helpers.setValue(val);
          helpers.setTouched(true);
        }}
      >
        <input
          type="text"
          placeholder="Search for Location"
          onChange={() => {
            if (!meta.touched) return;
            helpers.setValue({ lat: null, lng: null });
          }}
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `190px`,
            height: `40px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            marginBottom: "10px",
          }}
        />
      </Autocomplete>
      {meta.touched && meta.error ? (
        <Alert
          severity="error"
          style={{ marginTop: "2px", marginBottom: "15px" }}
        >
          Please enter a valid location.
        </Alert>
      ) : null}
    </>
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
        style={{
          width: getPaperWidth(width),
          minHeight: 250,
          maxHeight: 500,
          overflowY: "scroll",
        }}
        elevation={4}
      >
        <CameraBody />
      </Paper>
    </Fade>
  );
};

export default TripOverlay;
