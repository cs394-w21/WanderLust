import { OverlayView } from "@react-google-maps/api";
import { getLatLng } from "../utils/data";
import useFirebaseLocations from "../utils/useFirebaseLocations";
import makeStyles from "@material-ui/styles/makeStyles";
import Flex from "../components/Flex";

const useClass = makeStyles((theme) => ({
  img: {
    borderRadius: "50%",
  },
}));

const MapMarker = ({ setActivePin }) => {
  const { locations, isLocationsLoaded } = useFirebaseLocations("000-test");
  isLocationsLoaded ? console.log(locations[0].userPic) : console.log("");

  const classes = useClass();

  return isLocationsLoaded
    ? locations.map((location) => {
        return (
          <OverlayView
            position={getLatLng(location)}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <Flex
              width={60}
              height={60}
              marginLeft={-3}
              marginTop={-3}
              onClick={() => {
                setActivePin(location);
              }}
            >
              <img src={location.userPic} className={classes.img} />
            </Flex>
          </OverlayView>
        );
      })
    : null;
};

export default MapMarker;
