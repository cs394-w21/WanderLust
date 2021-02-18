import { useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

// Set to Evanston
const defaultCenter = {
  lat: 42.0451,
  lng: -87.6877,
};

// Disable all options except zoom
const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  scaleControl: true,
};

// Set map size to screen size
const containerStyle = {
  width: "100%",
  height: "100%",
};

const useMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Set map center to current center
  const onMapLoad = useCallback((map) => {
    // TODO: Change landing screen center
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.setCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => {
          console.warn(
            "Get current location failed, using default center. ",
            error
          );
          map.setCenter(defaultCenter);
        },
        { enableHighAccuracy: false, timeout: 500 }
      );
    }
  }, []);

  const onUnmount = useCallback((map) => {}, []);

  return { loading: !isLoaded, onMapLoad, onUnmount };
};

export default useMap;
export { defaultCenter, mapOptions, containerStyle };
