import React from "react";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Cancel";
import MenuItem from "@material-ui/core/MenuItem";
import NearMeIcon from "@material-ui/icons/NearMe";
import TrashCan from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import useFirebaseTrips from "../../utils/useFirebaseTrips";

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
  const { trip, onClick } = props;
  const classes = useModalStyles();
  return (
    <MenuItem onClick={onClick}>
      <Flex flexWrap="wrap" width="100%" justifyContent="space-between">
        <Flex>
          <NearMeIcon className={classes.nearMe} fontSize="small" />
          <Typography className={classes.tripName}>{trip.tripName}</Typography>
        </Flex>
        <TrashCan color="secondary" />
      </Flex>
    </MenuItem>
  );
};

const CreateTrip = (props) => {
  const { setCreatingTrip } = props;
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
        <Flex flexDirection="column">
          <TextField variant="outlined" label="Trip Title" />
        </Flex>
      </Flex>
    </Fade>
  );
};

const TripList = (props) => {
  const { setCurrentTrip, trips, setCreatingTrip } = props;
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
  const { trips, setCurrentTrip } = props;
  if (creatingTrip) return <CreateTrip setCreatingTrip={setCreatingTrip} />;
  return (
    <TripList
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
  const { trips, loading } = useFirebaseTrips(
    "03091a04-81ac-47fd-8b12-1f79baaf823e"
  );
  const [activeTrip, setCurrentTrip] = React.useState(null);
  if (loading) return <TripsLoading />;
  if (activeTrip !== null)
    return <CurrentTrip trip={activeTrip} setCurrentTrip={setCurrentTrip} />;
  return <TripsOverview trips={trips} setCurrentTrip={setCurrentTrip} />;
};

export default TripRouter;
