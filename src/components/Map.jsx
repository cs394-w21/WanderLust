import React, { useState, memo } from "react";
import { GoogleMap, Autocomplete, useGoogleMap } from "@react-google-maps/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import MapMarker from "./MapMarker";
import MapPinInfo from "./MapPinInfo";
import useMap, { mapOptions, containerStyle } from "../utils/useMap";
import Flex from "../components/Flex";
import Trip from "../components/Trip";
import Camera from '../components/Camera';

const moveMap = (map, place) => {
  const [lat, lng] = [
    place?.geometry?.location?.lat(),
    place?.geometry?.location?.lng(),
  ];
  map.setCenter({ lat: lat, lng: lng });
};

const LocationSearch = () => {
  const [autocomplete, setAutocomplete] = React.useState(3);
  const map = useGoogleMap();
  if (!autocomplete) return null;
  return (
    <Autocomplete
      onLoad={setAutocomplete}
      onPlaceChanged={() => {
        moveMap(map, autocomplete.getPlace());
      }}
    >
      <input
        type="text"
        placeholder="Search for Location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px",
          marginTop: "10px",
        }}
      />
    </Autocomplete>
  );
};

const LoadedMap = (props) => {
  const [activePin, setActivePin] = useState(null);

  const { containerStyle, mapOptions, zoom, onMapLoad, onUnmount } = props;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
      zoom={zoom}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      setActivePin={setActivePin}
    >
      <Trip />
      <Camera />
      <LocationSearch />
      <MapMarker setActivePin={setActivePin} />
      {activePin && (
        <MapPinInfo activePin={activePin} setActivePin={setActivePin} />
      )}
    </GoogleMap>
  );
};

const Map = () => {
  const { loading, onMapLoad, onUnmount } = useMap();

  return loading ? (
    <Flex justifyContent="center" alignItems="center" width="100%">
      {" "}
      <CircularProgress size="100px" />{" "}
    </Flex>
  ) : (
    <LoadedMap
      containerStyle={containerStyle}
      mapOptions={mapOptions}
      zoom={7}
      onMapLoad={onMapLoad}
      onUnmount={onUnmount}
    />
  );
};

export default memo(Map);
