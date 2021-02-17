import React, { useState, memo } from "react";
import { GoogleMap } from "@react-google-maps/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import MapMarker from "./MapMarker";
import MapPinInfo from "./MapPinInfo";
import useMap, { mapOptions, containerStyle } from "../utils/useMap";

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
    <CircularProgress />
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
