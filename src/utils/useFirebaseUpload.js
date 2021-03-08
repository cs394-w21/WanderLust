import { v4 as genUUID } from "uuid";
import { useGoogleMap } from "@react-google-maps/api";
import firebase from "./firebase";
import useNavbarContext from "./useNavbarContext";
import { userUUID, userName, userPic } from "./userData";

const useFirebaseUpload = () => {
  const map = useGoogleMap();
  const { closePopup } = useNavbarContext();

  const putImg = async (file) => {
    const imageSnap = await firebase
      .storage()
      .ref(`locations/${genUUID()}`)
      .put(file);

    const imgUrl = await firebase
      .storage()
      .ref(imageSnap.ref.fullPath)
      .getDownloadURL();
    return imgUrl;
  };

  const uploadPinToFirebase = async (values, imgUrl) => {
    const newPin = await firebase
      .database()
      .ref(`locations`)
      .push({
        date: values.date,
        comment: values.description,
        img: imgUrl,
        lat: values.locale.lat,
        lng: values.locale.lng,
        userName: userName,
        userPic: userPic,
        tags: {
          restaurant: values.restaurant,
          bar: values.bar,
          shop: values.shop,
          activity: values.activity,
          lodging: values.lodging,
        },
      });

    firebase.database().ref(`users/${userUUID}/locations`).push(newPin.key);
  };

  const gotoPinOnMap = (loc) => {
    map.setCenter(loc);
  };

  const handleSubmit = async (values, { setValues }) => {
    const imgUrl = await putImg(values.picture);
    await uploadPinToFirebase(values, imgUrl);
    gotoPinOnMap(values.locale);
    closePopup();
  };

  return handleSubmit;
};

export default useFirebaseUpload;
