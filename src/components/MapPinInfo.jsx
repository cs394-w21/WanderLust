import { InfoWindow } from "@react-google-maps/api";
import Typography from "@material-ui/core/Typography";
import { getLatLng } from "../utils/data";
// import useFirebaseImg from "../utils/useFirebaseImg";

const MapPinInfo = ({ activePin, setActivePin }) => {
  // const { imageUrl, isImageLoaded } = useFirebaseImg(activePin.img);

  return (
    <InfoWindow
      position={getLatLng(activePin)}
      onCloseClick={() => setActivePin(null)}
    >
      <div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <img
            alt={activePin.desc}
            src={activePin.img}
            style={{ width: 250, height: 250 }}
          />
        </div>
        <Typography>{activePin.comment}</Typography>
      </div>
    </InfoWindow>
  );
};

export default MapPinInfo;
