import { makeStyles } from "@material-ui/core/styles";

export const useModalStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraModal: {
    width: '100%',
    paddingTop: '60px',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
  },
  cameraPaper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    position: "absolute",
    bottom: 0,
    margin: "auto",
    marginBottom: "16px",
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
  header: {
    fontSize: "16pt",
    fontWeight: "bold",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  nearMe: {
    paddingRight: "10px",
  },
}));
