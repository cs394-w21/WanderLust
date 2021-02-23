import React from "react";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Cancel";
import MenuItem from "@material-ui/core/MenuItem";
import NearMeIcon from "@material-ui/icons/NearMe";
import TrashCan from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import useFirebaseTrips from "../../utils/useFirebaseTrips";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import FormField from '../FormField';

import { useModalStyles } from "./styles";
import Flex from "../../components/Flex";
import useNavbar from "../../utils/useNavbarContext.js";

const TripsLoading = () => {
  return (
    <Flex
      width="100%"
      height="100%"
      minHeight="250px"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress fontSize="large" />
    </Flex>
  );
};

const TripItem = (props) => {
  const { trip, onClick, makeDeleteTrip} = props;
  const classes = useModalStyles();
  return (
    <Flex flexWrap="wrap" width="100%" justifyContent="space-between">
    <MenuItem>
        <Flex onClick={onClick}>
          <NearMeIcon className={classes.nearMe} fontSize="small" />
          <Typography className={classes.tripName} >{trip.tripName}</Typography>
        </Flex>
        </MenuItem>
        <TrashCan color="secondary" 
        onClick={makeDeleteTrip(trip)}
        />
      </Flex>
  );
};

const tripFormValidation = Yup.object().shape({tripName: Yup.string().required("Title is a required field"),})
const initialValues = {
  tripName: "",
}


const CreateTripFields = () => {
  return (
    <>
      <FormField name="tripName" label="Trip Title"/>
      <Button variant="contained" color="primary" type="submit" style={{marginTop: "15px"}}>Submit</Button>
    </>

  )
}

const CreateTripForm = (props) => {

  return (
    <Formik initialValues={initialValues} 
      validationSchema={tripFormValidation} 
      onSubmit={(values) => {
        props.createTrip(values); 
        props.setCreatingTrip(false);
      }}>
      <Form>
        <Flex flexDirection="column">
          <CreateTripFields/>
        </Flex>
      </Form>
    </Formik>
  )
}

const CreateTrip = (props) => {
  const { setCreatingTrip, createTrip } = props;
  const classes = useModalStyles();
  return (
    <Fade in>
      <Flex flexDirection="column">
        <Flex
          paddingLeft="0px"
          paddingRight="0px"
          paddingBottom="16px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={classes.header}>Create a Trip</Typography>
          <ArrowBackIcon
            style={{ cursor: "pointer" }}
            onClick={() => setCreatingTrip(null)}
          />
        </Flex>
        <CreateTripForm createTrip={createTrip} setCreatingTrip={setCreatingTrip}/>
      </Flex>
    </Fade>
  );
};



const TripList = (props) => {
  const { setCurrentTrip, trips, setCreatingTrip, makeDeleteTrip} = props;
  const { closeTrips } = useNavbar();
  const modalClasses = useModalStyles();
  const openCreateTrip = React.useCallback(() => {
    setCreatingTrip(true);
  }, [setCreatingTrip]);
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
            My Trips
          </Typography>
          <CancelIcon style={{ cursor: "pointer" }} onClick={closeTrips} />
        </Flex>
        {trips.map((trip) => (
          <TripItem
            makeDeleteTrip={makeDeleteTrip}
            key={trip.id}
            trip={trip}
            onClick={() => setCurrentTrip(trip)}
          />
        ))}
        <Flex paddingTop="16px" paddingLeft="16px" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={openCreateTrip}
          >
            Create Trip
          </Button>
        </Flex>
      </Flex>
    </Fade>
  );
};

const TripsOverview = (props) => {
  const [creatingTrip, setCreatingTrip] = React.useState(false);
  const { trips, setCurrentTrip, makeDeleteTrip, createTrip} = props;
  if (creatingTrip) return <CreateTrip setCreatingTrip={setCreatingTrip} createTrip={createTrip}/>;
  return (
    <TripList
      makeDeleteTrip={makeDeleteTrip}
      trips={trips}
      setCurrentTrip={setCurrentTrip}
      setCreatingTrip={setCreatingTrip}
    />
  );
};

const CurrentTrip = (props) => {
  const { trip, setCurrentTrip } = props;
  const modalClasses = useModalStyles();
  return (
    <Fade in duration={1000}>
      <Flex alignItems="center" justifyContent="space-between">
        <Typography className={modalClasses.header} component="h6">
          {trip.tripName}
        </Typography>
        <ArrowBackIcon
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentTrip(null)}
        />
      </Flex>
    </Fade>
  );
};

const TripRouter = (props) => {
  const { trips, loading, makeDeleteTrip, createTrip } = useFirebaseTrips(
    "03091a04-81ac-47fd-8b12-1f79baaf823e"
  );
  const [activeTrip, setCurrentTrip] = React.useState(null);
  if (loading) return <TripsLoading />;
  if (activeTrip !== null)
    return <CurrentTrip trip={activeTrip} setCurrentTrip={setCurrentTrip} />;
  return <TripsOverview trips={trips} setCurrentTrip={setCurrentTrip} makeDeleteTrip={makeDeleteTrip} createTrip={createTrip}/>;
};

export default TripRouter;
