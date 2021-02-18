import React from "react";
import firebase from "./firebase";

const toRenderableArray = (obj) =>
  Object.entries(obj).map(([key, val]) => ({
    id: key,
    ...val,
  }));

const useFirebaseLocations = (userId) => {
  // NOTE: If we change the structure of our database later,
  // this hook will need to change as well.
  const [locations, setLocations] = React.useState(null);
  const handleNewLocations = React.useCallback(
    (snap) => {
      setLocations(toRenderableArray(snap.val()));
    },
    [setLocations]
  );
  React.useEffect(() => {
    const db = firebase.database().ref("users").child(userId);
    db.on("value", handleNewLocations, window.alert);
    return () => {
      db.off("value", handleNewLocations);
    };
  }, [handleNewLocations, userId]);
  return { locations, isLocationsLoaded: Array.isArray(locations) };
};

export default useFirebaseLocations;
