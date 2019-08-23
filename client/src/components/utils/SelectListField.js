import React, { useEffect, useState } from "react";

import { TextField } from "@material-ui/core";

function SelectListField(props) {
  const [list, setList] = useState("");
  const {
    listValues,
    promptText,
    onChangeHandler,
    startingValue,
    fillWidthOf
  } = props;

  useEffect(() => {
    if (
      list === "" &&
      listValues.find(element => element._id === startingValue._id) != undefined
    ) {
      setList(
        listValues.find(element => element._id === startingValue._id)._id
      );
    }
  }, [list, listValues, startingValue]);

  function handleChangeList(event) {
    const selectedList = listValues.find(
      element => element._id === event.target.value
    );
    setList(selectedList._id);
    onChangeHandler(selectedList);
  }

  function GenerateSelectProps() {
    return list === ""
      ? {
          native: true,
          style: {
            width: "100%",
            textAlignLast: "center",
            color: "grey"
          },
          inputProps: {
            style: {
              width: "100%"
            }
          }
        }
      : {
          native: true,
          style: {
            width: "100%",
            textAlignLast: "center",
            color: "black"
          },
          inputProps: {
            style: {
              width: "100%"
            }
          }
        };
  }

  return (
    <TextField
      select
      value={list}
      onChange={handleChangeList}
      style={{
        backgroundColor: "white",
        width: fillWidthOf,
        height: "50px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
      InputProps={{ disableUnderline: true }}
      inputProps={{ style: { paddingRight: "0px" } }}
      SelectProps={GenerateSelectProps()}
    >
      <option value="" disabled>
        {promptText}
      </option>
      {listValues.map(element => (
        <option key={element._id} value={element._id}>
          {element.name}
        </option>
      ))}
    </TextField>
  );
}

export default SelectListField;
