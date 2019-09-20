import { makeStyles } from "@material-ui/core/styles";

const scrappingConfirmationStyles = makeStyles(theme => ({
  containerStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  tileStyle: {
    width: "80%",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "0px"
  },
  buttonContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonStyle: {
    margin: "10px 10px 30px 10px",
    backgroundColor: theme.primary,
    color: "white",
    borderRadius: "20px"
    // width: "240px"
  }
}));

export default scrappingConfirmationStyles;
