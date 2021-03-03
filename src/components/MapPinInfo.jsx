import { InfoWindow } from "@react-google-maps/api";
import { getLatLng } from "../utils/data";
import PinWindow from "./PinWindow";

const MapPinInfo = ({ activePin, setActivePin }) => {
  return (
    <InfoWindow
      position={getLatLng(activePin)}
      onCloseClick={() => setActivePin(null)}
    >
      <PinWindow {...activePin} />
    </InfoWindow>
  );
};

export default MapPinInfo;
