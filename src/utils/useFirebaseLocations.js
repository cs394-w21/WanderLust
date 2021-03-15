import React from "react";
import firebase from "./firebase";

const joinAccountToLocations = (locations) =>
  Object.entries(locations).map(([key, location]) => {
    return {
      id: key,
      ...location,
    };
  });

const useFirebaseLocations = (userId) => {
  const [locations, setLocations] = React.useState(null);
  const handleNewLocations = React.useCallback(
    (snap) => {
      const joinedLocations = joinAccountToLocations(snap.val());
      setLocations(joinedLocations);
    },
    [setLocations]
  );
  React.useEffect(() => {
    const db = firebase.database().ref("locations");
    db.on("value", handleNewLocations, window.alert);
    return () => {
      db.off("value", handleNewLocations);
    };
  }, [handleNewLocations, userId]);
  return { locations, isLocationsLoaded: Array.isArray(locations) };
};

export default useFirebaseLocations;
