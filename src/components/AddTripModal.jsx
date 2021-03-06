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
import { userUUID } from "../utils/userData";

const SingleTrip = ({ trip }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, _, helpers] = useField(trip.id);
  const toggleTrip = React.useCallback(() => {
    helpers.setValue(!field.value);
  }, [field.value, helpers]);
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Typography>{trip.tripName}</Typography>
      <Checkbox checked={field.value} onChange={toggleTrip} />
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
      [el.id]: Boolean(el?.locations?.[pin.id]?.enabled),
    }),
    {}
  );
};

const AddToTripForm = ({ trips, pin, addLocationToTrips, closeModal }) => {
  const initialValues = {
    pin,
    ...makeInitialValues(trips, pin),
  };
  return (
    <Formik
      onSubmit={(values) => {
        addLocationToTrips(values);
        closeModal();
      }}
      initialValues={initialValues}
    >
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

const AddTripModal = (props) => {
  const { trips, addLocationToTrips, loading } = useFirebaseTrips(userUUID);
  const styles = useStyles();
  if (loading) return null;
  return (
    <Modal open={props.modalActive} onClose={props.closeModal}>
      <Paper className={styles.paper}>
        <Typography className={styles.heading}>Add Pin to Trips:</Typography>
        <AddToTripForm
          trips={trips}
          pin={props.pin}
          closeModal={props.closeModal}
          addLocationToTrips={addLocationToTrips}
        />
      </Paper>
    </Modal>
  );
};

export default AddTripModal;
