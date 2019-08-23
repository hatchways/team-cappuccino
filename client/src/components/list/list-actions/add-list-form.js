import React from 'react';
import Dialog from "@material-ui/core/Dialog";




const AddListForm = props => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    }
    
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "WhiteSmoke",
            width: "50vw"
          }
        }}
      > 
      {props.children}
    </Dialog>
    )
}


export default AddListForm;