import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useField, Formik, Form } from "formik";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useFirebaseTrips from "../utils/useFirebaseTrips";
import Checkbox from "@material-ui/core/Checkbox";
import Flex from "./Flex";

const SingleTrip = ({ trip }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, _, helpers] = useField(trip.id);
  const toggleTrip = React.useCallback(() => {
    helpers.setValue(!field.value);
  });
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Typography>{trip.tripName}</Typography>
      <Checkbox onChange={toggleTrip} />
    </Flex>
  );
};

const TripSelector = ({ trips }) => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex flexDirection="column">
        {trips.map((trip) => (
          <SingleTrip key={trip.id} trip={trip} />
        ))}
      </Flex>
    </Flex>
  );
};

const makeInitialValues = (trips, pin) => {
  return trips.reduce(
    (acc, el) => ({
      ...acc,
      [el.id]:
        trips?.locations?.find((location) => location.id === pin.id) || false,
    }),
    {}
  );
};

const AddToTripForm = ({ trips, pin, addLocationToTrips }) => {
  const initialValues = {
    location: pin,
    ...makeInitialValues(trips, pin),
  };
  return (
    <Formik handleSubmit={addLocationToTrips} initialValues={initialValues}>
      <Form>
        <TripSelector trips={trips} />
        <Flex justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      width: "400px",
      top: "40%",
      left: 0,
      right: 0,
      textAlign: "center",
      padding: "10px",
    },
    heading: {
      fontSize: "16pt",
      fontWeight: "bold",
    },
  };
});

// TODO: handle how to pre-mark what trips a pin is already a part of
const AddTripModal = (props) => {
  const { trips, addLocationToTrips, loading } = useFirebaseTrips(
    "03091a04-81ac-47fd-8b12-1f79baaf823e"
  );
  const styles = useStyles();
  if (loading) return null;
  return (
    <Modal open={props.modalActive} onClose={props.closeModal}>
      <Paper className={styles.paper}>
        <Typography className={styles.heading}>Add Pin to Trips:</Typography>
        <AddToTripForm
          trips={trips}
          pin={props.pin}
          addLocationToTrips={addLocationToTrips}
        />
      </Paper>
    </Modal>
  );
};

export default AddTripModal;
