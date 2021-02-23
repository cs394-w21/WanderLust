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
  
  const createTrip = React.useCallback( async (trip) => {
    const db = firebase.database().ref(`accounts/${userId}/trips`);
    try {
      await db.push().set(trip);
    } catch (err) {
      console.log(err);
    }

  })

  const makeDeleteTrip = React.useCallback((trip) => {
    const deleteTrip = async() =>{ 
      const db = firebase.database().ref(`accounts/${userId}/trips/${trip.id}`);
      //this path has to change after the database is refactored
      try {
        await db.remove();
      } catch (err) {
        console.log(err);
      }
    };
    return deleteTrip;
   }, [userId]);

  React.useEffect(() => {
    const db = firebase.database().ref();
    db.on("value", handleNewTrips, window.alert);
    return () => {
      db.off("value", handleNewTrips);
    };
  }, [handleNewTrips, userId]);
  return { trips, makeDeleteTrip, createTrip, loading: !Array.isArray(trips) };
};


export default useFirebaseTrips;
