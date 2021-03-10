import { OverlayView } from "@react-google-maps/api";
import { getLatLng } from "../utils/data";
import useFirebaseLocations from "../utils/useFirebaseLocations";
import makeStyles from "@material-ui/styles/makeStyles";
import Flex from "../components/Flex";

const useClass = makeStyles((theme) => ({
  img: {
    borderRadius: "50%",
    width: "60px",
    height:"60px"
  },
}));

const MapMarker = ({ setActivePin }) => {
  const { locations, isLocationsLoaded } = useFirebaseLocations("000-test");
  const classes = useClass();

  return isLocationsLoaded
    ? locations.map((location) => {
        return (
          <OverlayView
            key={location.id}
            position={getLatLng(location)}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <Flex
              marginLeft={-3}
              marginTop={-3}
              onClick={() => setActivePin(location)}
            >
              <img
                alt={location.userName}
                src={location.userPic}
               className={classes.img}
              />
            </Flex>
          </OverlayView>
        );
      })
    : null;
};

export default MapMarker;
