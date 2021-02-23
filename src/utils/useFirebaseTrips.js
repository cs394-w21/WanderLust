import React from "react";
import firebase from "./firebase";

const useFirebaseTrips = (userId) => {
  const [trips, setTrips] = React.useState(null);
  const handleNewTrips = React.useCallback(
    (snap) => {
      const dbVal = snap.val();
      setTrips(
        Object.entries(dbVal?.accounts?.[userId]?.trips).map(
          ([key, value]) => ({
            id: key,
            ...value,
          })
        )
      );
    },
    [userId]
  );
  React.useEffect(() => {
    const db = firebase.database().ref();
    db.on("value", handleNewTrips, window.alert);
    return () => {
      db.off("value", handleNewTrips);
    };
  }, [handleNewTrips, userId]);
  return { trips, loading: !Array.isArray(trips) };
};

export default useFirebaseTrips;
