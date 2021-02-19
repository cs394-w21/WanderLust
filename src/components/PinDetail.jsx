import React from 'react';
import Typography from "@material-ui/core/Typography";
import Flex from "./Flex";
import makeStyles from "@material-ui/styles/makeStyles";
import { useWindowWidth } from "@react-hook/window-size";


const useStyles = makeStyles({
    link: {
      fontWeight: "bold",
      fontSize: "16pt",
      color: "blue",
    },
    date: {
        fontSize: "14pt",
      },
  });

const FriendInfo = (props) => {
    const styles = useStyles();
    return (
      <Flex flexDirection="column" alignItems="center">
        <Typography className={styles.link}>{props.userName}</Typography>
        <Typography className={styles.date}>{props.date}</Typography>
      </Flex>
    );
  };

export default function PinDetail ( props ) {
    const width = useWindowWidth();
    const size = (width > 500) ? 250 : width/2

    return (
        <Flex flexDirection="column" alignItems="center" >
            <Flex padding="4px" flexWrap="wrap" justifyContent="center">
            <img
                style={{
                display: "flex",
                maxHeight: "32px",
                paddingRight: "10px",
                paddingBottom: "10px",
                }}
                src="/favicon.png"
                alt="Wanderlust"
            />
            <img
                alt={props.comment}
                src={props.img}
                style={{ width: size, height: size, paddingRight: "10px", paddingBottom: "10px",}}
            />
            <FriendInfo {...props} />
            </Flex>
            <Flex maxWidth="250px">
            <Typography>{props.comment}</Typography>
            </Flex>
        </Flex>
    )
}