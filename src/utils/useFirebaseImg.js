import React from "react";
import firebase from "./firebase";

const useFirebaseImg = (img) => {
  // NOTE: If we change the structure of our database later,
  // this hook will need to change as well.
  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    firebase
      .storage()
      .ref(img)
      .getDownloadURL()
      .then((url) => setImageUrl(url));

    return null;
  }, [setImageUrl, img]);
  return { imageUrl, isImageLoaded: imageUrl !== null };
};

export default useFirebaseImg;
