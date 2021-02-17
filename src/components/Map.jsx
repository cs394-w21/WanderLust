import React, { useState, memo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import useFirebaseLocations from "../utils/useFirebaseLocations";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 42.0451,
  lng: -87.6877,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const { locations, isLocationsLoaded } = useFirebaseLocations("000-test");
  const [activePin, setActivePin] = React.useState(null);

  // eslint-disable-next-line
  const [_, setMap] = useState(null);
  return isLoaded && isLocationsLoaded ? (
    <>
      <GoogleMap center={center} mapContainerStyle={containerStyle} zoom={10}>
        <>
          {locations.map((location) => {
            return (
              <Marker
                key={location.id}
                onClick={() => {
                  setActivePin(location);
                }}
                position={{ lat: location.lat, lng: location.lng }}
              />
            );
          })}
        </>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default memo(Map);
