import { InfoWindow } from "@react-google-maps/api";
import Typography from "@material-ui/core/Typography";
import Flex from "../components/Flex";
import makeStyles from "@material-ui/styles/makeStyles";
import { getLatLng } from "../utils/data";

const useStyles = makeStyles({
  link: {
    fontWeight: "bold",
    fontSize: "16pt",
    color: "blue",
  },
});

const FriendInfo = (props) => {
  const styles = useStyles();
  return (
    <Flex flexDirection="column">
      <Typography className={styles.link}>{props.userName}</Typography>
    </Flex>
  );
};

const MapPinInfo = ({ activePin, setActivePin }) => {
  return (
    <InfoWindow
      position={getLatLng(activePin)}
      onCloseClick={() => setActivePin(null)}
    >
      <Flex flexDirection="column" alignItems="center">
        <Flex padding="4px">
          <img
            style={{
              display: "flex",
              maxHeight: "32px",
              paddingRight: "10px",
            }}
            src="/favicon.png"
            alt="Wanderlust"
          />
          <img
            alt={activePin.comment}
            src={activePin.img}
            style={{ width: 250, height: 250, paddingRight: "10px" }}
          />
          <FriendInfo {...activePin} />
        </Flex>
        <Flex maxWidth="250px">
          <Typography>{activePin.comment}</Typography>
        </Flex>
      </Flex>
    </InfoWindow>
  );
};

export default MapPinInfo;
