import { Marker } from "@react-google-maps/api";
import { getLatLng } from "../utils/data";
import useFirebaseLocations from "../utils/useFirebaseLocations";

const MapMarker = ({ setActivePin }) => {
  const { locations, isLocationsLoaded } = useFirebaseLocations("000-test");

  return isLocationsLoaded ? (
    locations.map((location) => {
      return (
        <Marker
          key={location.id}
          onClick={() => {
            setActivePin(location);
          }}
          position={getLatLng(location)}
        />
      );
    })
  ) : (
    <></>
  );
};

export default MapMarker;
