import React from "react";
import firebase from "./firebase";

const joinAccountToPins = (accounts, pins) =>
  Object.entries(pins).map(([key, pin]) => {
    const account = accounts[pin.user];
    return { id: key, userName: account.name, userPic: account.img, ...pin };
  });

const useFirebaseLocations = (userId) => {
  const [locations, setLocations] = React.useState(null);
  const handleNewLocations = React.useCallback(
    (snap) => {
      const pins = joinAccountToPins(snap.val().accounts, snap.val().pins);
      setLocations(pins);
    },
    [setLocations]
  );
  React.useEffect(() => {
    const db = firebase.database().ref();
    db.on("value", handleNewLocations, window.alert);
    return () => {
      db.off("value", handleNewLocations);
    };
  }, [handleNewLocations, userId]);
  return { locations, isLocationsLoaded: Array.isArray(locations) };
};

export default useFirebaseLocations;
