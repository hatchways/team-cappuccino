import { makeStyles } from "@material-ui/core/styles";

const headerNotificationStyles = makeStyles(theme => ({
  topBar: {
    width: "100%",
    height: "3px",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center"
  },
  arrowUp: {
    width: "0",
    height: "0",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderBottom: "4px solid black",
    position: "absolute",
    top: "-4px"
  },
  notificationBody: {
    display: "flex",
    flexDirection: "column",
    width: "25vw",
    padding: "10px",
    overflow: "hidden"
  },
  headerDiv: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "35px"
  },
  cardCountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)"
  },
  cardCountFont: {
    fontSize: "1em",
    color: "grey",
    margin: "0px"
  },
  tileStyle: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "0px"
  },
  notificationFont: {
    fontSize: "1em",
    fontWeight: 700,
    margin: "0px",
    position: "absolute",
    left: 0
  }
}));

export default headerNotificationStyles;
