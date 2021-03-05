import React from "react";
import firebase from "./firebase";

const getLocations = (trip) => {
  if (!trip?.locations) return [];
  return Object.entries(trip.locations).filter(
    ([key, location]) => location?.enabled
  );
};

export const useFirebaseTrip = (userId, tripId) => {
  const [trip, setTrip] = React.useState(null);
  const loadTrip = React.useCallback(
    (snap) => {
      setTrip(snap.val());
    },
    [setTrip]
  );
  const [tripDbRef] = React.useState(
    firebase.database().ref(`users/${userId}/trips/${tripId}`)
  );
  React.useEffect(() => {
    tripDbRef.on("value", loadTrip, window.alert);
    return tripDbRef.off("value", loadTrip);
  }, [tripDbRef, loadTrip, tripId, userId]);
  const locations = getLocations(trip);
  const makeDeleteLocation = React.useCallback(
    (location) => {
      const deleteLocation = async () => {
        const db = firebase
          .database()
          .ref(`users/${userId}/trips/${tripId}/locations/${location?.id}`);
        db.on("value", (snap) => console.log(snap.val()));
        try {
          await db.set({ ...location, enabled: false });
          const val = await tripDbRef.get();
          setTrip(val.exportVal());
        } catch (err) {
          console.log(err);
        }
      };
      return deleteLocation;
    },
    [tripDbRef, tripId, userId]
  );
  return { trip, loading: !trip, locations, makeDeleteLocation };
};

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

  // const makeDeleteLocation = React.useCallback(
  //   (trip, location) => {
  //     const deleteLocation = async () => {
  //       const db = firebase
  //         .database()
  //         .ref(`users/${userId}/trips/${trip?.id}/locations/${location?.id}`);
  //       try {
  //         await db.set({ ...location, enabled: false });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     return deleteLocation;
  //   },
  //   [userId]
  // );

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
