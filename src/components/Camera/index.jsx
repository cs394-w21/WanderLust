import React from "react";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import dayjs from "dayjs";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { useWindowSize } from "@react-hook/window-size";
import useNavbar from "../../utils/useNavbarContext.js";
import Flex from "../../components/Flex";
import { useModalStyles } from "../../utils/popupStyles";
import ImageUploader from "react-images-upload";
import { Autocomplete } from "@react-google-maps/api";
import Button from "@material-ui/core/Button";
import FormField from "../../components/FormField";
import { Formik, Form, useField } from "formik";
import Alert from "@material-ui/lab/Alert";
import ActivityForm from "./ActivityForm";
import exifr from "exifr";
import * as Yup from "yup";
import useFirebaseUpload from "../../utils/useFirebaseUpload";

export const initialValues = {
  picture: undefined,
  date: "",
  description: "",
  restaurant: false,
  bar: false,
  activity: false,
  shop: false,
  lodging: false,
  locale: {
    lat: "",
    lng: "",
  },
};

const getPaperWidth = (width) => {
  if (width > 500) return 400;
  if (width > 350) return width / 2;
  return width - 90;
};

const getPlaceFromLocale = async (locale) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locale.lat},${locale.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  );
  const json = await response.json();

  return json?.results[0];
};

const renameLocaleFields = (locale) =>
  locale
    ? {
        lat: locale.latitude,
        lng: locale.longitude,
      }
    : { lat: null, lng: null };

const Picture = ({ setAddressValue }) => {
  /* eslint-disable no-unused-vars */
  const [_, meta, helpersPicture] = useField("picture");
  const [__, ____, helpersLocale] = useField("locale");
  const [_____, ______, helpersDate] = useField("date");
  /* eslint-enable no-unused-vars */
  return (
    <>
      <ImageUploader
        withIcon={true}
        buttonText="Choose image"
        onChange={async (pictures) => {
          try {
            const gpsLocale = await exifr.gps(pictures[0]);
            const locale = renameLocaleFields(gpsLocale);

            helpersPicture.setValue(pictures[0]);
            helpersPicture.setTouched(true);

            helpersLocale.setValue(locale);
            helpersLocale.setTouched(true);
            if (!locale.lat || !locale.lng) return;
            const place = await getPlaceFromLocale(locale);
            const exifrData = await exifr.parse(pictures[0]);
            setAddressValue(place.formatted_address);
            helpersDate.setValue(
              dayjs(exifrData.DateTimeOriginal).format("MM/DD/YY")
            );
          } catch (err) {
            console.error(err);
          }
        }}
        withPreview={true}
        label="Max File Size: 5mb, Accepted: jpg, png"
        imgExtension={[".jpg", ".png", ".jpeg", ".heic"]}
        maxFileSize={5242880}
        singleImage
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

const validationSchema = Yup.object().shape({
  picture: Yup.object().nullable(),
  date: Yup.string()
    .test("isValid", "Dates must be in format MM/DD/YY", (value) => {
      return (
        new RegExp(/^\d{1,2}\/\d{1,2}\/\d{2}$/).test(value) &&
        dayjs(value, "MM/DD/YY", true).isValid()
      );
    })
    .required("Please enter a date"),
  description: Yup.string().required("Please enter a description"),
  restaurant: Yup.boolean().required(""),
  bar: Yup.boolean().required(""),
  shop: Yup.boolean().required(""),
  activity: Yup.boolean().required(""),
  lodging: Yup.boolean().required(""),
  locale: Yup.object()
    .shape({
      lat: Yup.number().required(),
      lng: Yup.number().required(),
    })
    .required(),
});

const CreateCameraForm = (props) => {
  const handleSubmit = useFirebaseUpload();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Flex flexDirection="column">
          <AddPictureFields />
        </Flex>
      </Form>
    </Formik>
  );
};

const AddPictureInputs = ({ addressValue, setAddressValue }) => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <LocationSearch
        addressValue={addressValue}
        setAddressValue={setAddressValue}
      />
      <FormField name="date" label="Date" size="small" />
      <Flex py="8px"></Flex>
      <FormField name="description" label="Description" size="small" />
      <Flex py="8px"></Flex>
      <ActivityForm />
      <Flex py="8px"></Flex>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Flex>
  );
};

const AddPictureFields = () => {
  const [addressValue, setAddressValue] = React.useState("");
  return (
    <>
      <Picture setAddressValue={setAddressValue} />
      <AddPictureInputs
        addressValue={addressValue}
        setAddressValue={setAddressValue}
      />
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

const LocationSearch = ({ addressValue, setAddressValue }) => {
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
          setAddressValue(autocomplete.getPlace().formatted_address);
        }}
      >
        <input
          type="text"
          placeholder="Search for Location"
          onChange={(event) => {
            helpers.setValue({ lat: null, lng: null });
            setAddressValue(event?.target?.value);
          }}
          value={addressValue}
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
  const [width, height] = useWindowSize();
  if (currentTab !== "Camera") return null;
  return (
    <Fade in={currentTab === "Camera"}>
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
        <CameraBody />
      </Paper>
    </Fade>
  );
};

export default TripOverlay;
