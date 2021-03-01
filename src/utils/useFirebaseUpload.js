import React from "react";
import { v4 as genUUID } from "uuid";
import { useGoogleMap } from "@react-google-maps/api";
import firebase from "./firebase";
import useNavbarContext from "./useNavbarContext";
import { useFormikContext } from "formik";

export const initialValues = {
  picture: undefined,
  date: "",
  description: "",
  activityType: "",
  locale: {
    lat: "",
    lng: "",
  },
};

const danUUID = "03091a04-81ac-47fd-8b12-1f79baaf823e";
const danName = "Dan";
const danPic =
  "https://firebasestorage.googleapis.com/v0/b/wanderlust-708c7.appspot.com/o/Dan_Profile_Pic.png?alt=media&token=fe1caeca-0be7-4d7b-83d9-a67d894988f1";

const useFirebaseUpload = () => {
  const map = useGoogleMap();
  const { closePopup } = useNavbarContext();

  const putImg = async (file) => {
    const imageSnap = await firebase
      .storage()
      .ref(`user/${genUUID()}`)
      .put(file);

    const imgUrl = await firebase
      .storage()
      .ref(imageSnap.ref.fullPath)
      .getDownloadURL();
    return imgUrl;
  };

  const uploadPinToFirebase = async (values, imgUrl) => {
    const newPin = await firebase.database().ref(`locations`).push({
      date: values.date,
      comment: values.description,
      img: imgUrl,
      lat: values.locale.lat,
      lng: values.locale.lng,
      userName: danName,
      userPic: danPic,
    });

    firebase.database().ref(`users/${danUUID}/locations`).push(newPin.key);
  };

  const gotoPinOnMap = (loc) => {
    map.setCenter(loc);
  };

  const handleSubmit = async (values, { setValues }) => {
    const imgUrl = await putImg(values.picture);
    await uploadPinToFirebase(values, imgUrl);
    gotoPinOnMap(values.locale);
    closePopup();
    setValues(initialValues);
  };

  return handleSubmit;
};

export default useFirebaseUpload;
