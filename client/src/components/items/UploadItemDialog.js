import React, { useState, useEffect } from "react";
import { addItem } from "../api/index.js";
import Button from "@material-ui/core/Button";
import Spinner from "../utils/spinner.js";
import ScrappingConfirmation from "./ScrappingConfirmation.js";

function UploadItemDialog(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "20vw",
        width: "20vw"
      }}
    >
      <Spinner />
    </div>
  );
}

export default UploadItemDialog;
