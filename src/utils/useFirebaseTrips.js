import React from "react";
import firebase from "./firebase";

const useFirebaseTrips = (userId) => {
  const [trips, setTrips] = React.useState(null);
  const handleNewTrips = React.useCallback((snap) => {
    const trips = snap.val()?.trips || {};
    setTrips(
      Object.entries(trips).map(([key, value]) => ({
        id: key,
        ...value,
      }))
    );
  }, []);

  const createTrip = React.useCallback(
    async (trip) => {
      const db = firebase.database().ref(`users/${userId}/trips`);
      try {
        await db.push().set(trip);
      } catch (err) {
        console.log(err);
      }
    },
    [userId]
  );

  const makeDeleteTrip = React.useCallback(
    (trip) => {
      const deleteTrip = async () => {
        const db = firebase.database().ref(`users/${userId}/trips/${trip.id}`);
        //this path has to change after the database is refactored
        try {
          await db.remove();
        } catch (err) {
          console.log(err);
        }
      };
      return deleteTrip;
    },
    [userId]
  );

  const addLocationToTrips = React.useCallback(
    async (values) => {
      const { pin: location } = values;
      const trips = Object.keys(values)
        .filter((val) => val !== "pin")
        .map((key) => ({ id: key, enabled: values[key] }));
      for (let i = 0; i < trips.length; i++) {
        const db = firebase
          .database()
          .ref(`users/${userId}/trips/${trips[i].id}/locations`);
        try {
          await db
            .child(location.id)
            .set({ ...location, enabled: trips[i].enabled });
        } catch (err) {
          console.log(err);
        }
      }
    },
    [userId]
  );

  React.useEffect(() => {
    const db = firebase.database().ref(`users/${userId}`);
    db.on("value", handleNewTrips, window.alert);
    return () => {
      db.off("value", handleNewTrips);
    };
  }, [handleNewTrips, userId]);
  return {
    trips,
    makeDeleteTrip,
    createTrip,
    addLocationToTrips,
    loading: !Array.isArray(trips),
  };
};

export default useFirebaseTrips;
