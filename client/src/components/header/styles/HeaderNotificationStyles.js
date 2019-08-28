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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "white",
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
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imgContainerStyle: {
    width: "10vh",
    height: "100%",
    overflow: "hidden"
  },
  imgStyle: {
    width: "100%"
  },
  textBlock: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "20px"
  },
  itemNameFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "10px",
    marginBottom: "0px"
  },
  linkFont: {
    fontSize: ".6em",
    color: "grey",
    marginTop: "4px",
    marginBottom: "0px"
  },
  prices: {
    marginTop: "4px",
    display: "inline-flex",
    alignItems: "center"
  },
  oldPriceFont: {
    fontSize: ".7em",
    margin: "0px",
    textDecoration: "line-through"
  },
  newPriceFont: {
    fontSize: ".8em",
    margin: "0px",
    marginLeft: "2px",
    color: theme.primary
  }
}));

export default headerNotificationStyles;
