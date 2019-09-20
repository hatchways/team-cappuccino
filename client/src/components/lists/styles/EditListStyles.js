import { makeStyles } from "@material-ui/core/styles";

const editListStyles = makeStyles(theme => ({
  titleFont: {
    fontSize: "1em",
    fontWeight: 700,
    margin: "30px 0px 0px 0px",
    textAlign: "center",
    padding: "0px"
  },
  itemCountFont: {
    fontSize: ".8em",
    color: "grey",
    fontWeight: 400,
    textAlign: "center",
    margin: "0px 0px 20px 0px"
  },
  gridListContainer: {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "50px"
  },
  gridListStyles: {
    height: "40vh",
    width: "90%"
  },
  tileStyle: {
    width: "100%",
    marginTop: "15px",
    marginBottom: "5px",
    borderRadius: "10px"
  },
  addNewItemButton: {
    borderRadius: "20px",
    fontSize: ".8em",
    fontWeight: 400,
    color: "white",
    backgroundColor: theme.primary,
    marginTop: "40px",
    height: "38px"
  }
}));

export default editListStyles;
