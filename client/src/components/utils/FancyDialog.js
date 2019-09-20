import React, { useState } from "react";
import ReactDOM from "react-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function FancyDialog(props) {
  const { open, setOpen, dialogs, dialogStates } = props;
  const [childState, setChildState] = useState(dialogStates);
  const [childOpacities, setChildOpacities] = useState(() => {
    let newObj = {};
    for (let key in dialogStates) {
      newObj[key] = dialogStates[key].visible ? "100" : "0";
    }
    return newObj;
  });
  const [childRefs, setChildRefs] = useState(() => {
    let newObj = {};
    for (let key in dialogStates) {
      newObj[key] = React.createRef();
    }
    return newObj;
  });
  const [style, setStyle] = useState({});

  function setCurrentStyle(childOn) {
    if (childState[childOn].style.height !== undefined) {
      console.log("preset height found");
      setStyle(childState[childOn].style);
    } else {
      const style = childState[childOn].style;
      const ref = childRefs[childOn].current;
      const height = ref === null ? "auto" : ref.scrollHeight;
      console.log("preset height not found, height is: ", height);
      setStyle({ ...style, height: height });
    }
  }

  const makeDialogOpen = childOn => {
    setOpen(true);
    const childOnObj = childState[childOn];
    setChildState({
      ...childState,
      [childOn]: { ...childOnObj, visible: true }
    });
    setTimeout(() => {
      setChildOpacities({ ...childOpacities, [childOn]: "100" });
      setCurrentStyle(childOn);
    }, 10);
  };

  const makeDialogClosed = childOff => {
    const childOffObj = childState[childOff];
    setChildOpacities({ ...childOpacities, [childOff]: "0" });
    setTimeout(() => {
      setChildState({
        ...childState,
        [childOff]: { ...childOffObj, visible: false }
      });
      setOpen(false);
    }, 500);
  };

  const clickOffDialog = () => {
    let currentOn = "";
    for (let key in childState) {
      if (childState[key].visible) {
        currentOn = key;
      }
    }
    makeDialogClosed(currentOn);
  };

  const changeDialogState = (childOff, childOn, ...otherOff) => {
    const otherOffStates = {};
    const otherOffOpacities = {};
    otherOff.forEach(element => {
      const otherOffObj = childState[element];
      return (otherOffStates[element] = { ...otherOffObj, visible: false });
    });
    otherOff.forEach(element => (otherOffOpacities[element] = "0"));
    setChildOpacities({ ...childOpacities, [childOff]: "0" });
    setTimeout(() => {
      const childOffObj = childState[childOff];
      const childOnObj = childState[childOn];

      setChildState({
        ...childState,
        ...otherOffStates,
        [childOff]: { ...childOffObj, visible: false },
        [childOn]: { ...childOnObj, visible: true }
      });
      setTimeout(() => {
        setCurrentStyle(childOn);
        setChildOpacities({
          ...childOpacities,
          ...otherOffOpacities,
          [childOff]: "0",
          [childOn]: "100"
        });
      }, 100);
    }, 500);
  };

  return (
    <>
      {props.children.map(child => {
        return React.cloneElement(child, {
          makeDialogOpen: makeDialogOpen,
          changeDialogState: changeDialogState
        });
      })}
      <Dialog
        open={open}
        onClose={clickOffDialog}
        PaperProps={{ style: { maxWidth: "none" } }}
      >
        <DialogContent style={{ ...style, transition: "all 1.2s" }}>
          {dialogs.map(child => {
            const childName = child.key;
            return (
              <div
                style={{
                  display: !childState[childName].visible ? "none" : "block",
                  opacity: childOpacities[childName],
                  transition: "opacity 0.5s",
                  width: "100%",
                  height: "100%"
                }}
              >
                <div ref={childRefs[childName]}>
                  {/* style={{ width: "100%",  }} */}
                  {React.cloneElement(child, {
                    changeDialogState: changeDialogState,
                    makeDialogClosed: makeDialogClosed
                  })}
                </div>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FancyDialog;
