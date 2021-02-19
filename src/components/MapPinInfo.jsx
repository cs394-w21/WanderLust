import { InfoWindow } from "@react-google-maps/api";
import { getLatLng } from "../utils/data";
import PinDetail from "./PinDetail"


const MapPinInfo = ({ activePin, setActivePin }) => {
  return (
    <InfoWindow
      position={getLatLng(activePin)}
      onCloseClick={() => setActivePin(null)}
    >
      <PinDetail {...activePin} />
    </InfoWindow>
  );
};

export default MapPinInfo;
