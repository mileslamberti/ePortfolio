import React, {useState, useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import MultiselectCheckbox from "./MultiselectCheckbox.component";


function DialogPortfolioCard(props){

    const {handleClickOpen, handleDialogConfirm, handleDialogCancel, open, title, description, extendedDescription, dialogInformation} = props
    const [formTitle, setFormTitle] = useState(title);
    const [formDescription, setFormDescription] = useState(description);
    const [formExtendedDescription, setFormExtendedDescription] = useState(extendedDescription);
    const [filesToAssociate, setFilesToAssociate] = useState([])

    const updateFilesToAssociate = (fs) =>{
        setFilesToAssociate(fs);
    }

    const onChangeTitle = (e) => {
        setFormTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setFormDescription(e.target.value);
    }

    const onChangeExtendedDescription = (e) => {
        setFormExtendedDescription(e.target.value);
    }

    const handleCancelClick = () =>{
        setFormTitle(title);
        setFormDescription(description);
        setFormExtendedDescription(extendedDescription);
        setFilesToAssociate([]);
        handleDialogCancel();
    }

    return(
        <Dialog open={open} onClose={handleCancelClick} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogInformation.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogInformation.description}
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Title of Card"
            fullWidth
            defaultValue={title}
            value={formTitle}
            onChange={onChangeTitle}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description of Card"
            fullWidth
            defaultValue={description}
            value={formDescription}
            onChange={onChangeDescription}
          />
        <TextField
            margin="dense"
            id="extendedDescription"
            label="Extended Description (visible in when pressing dropdown button)"
            fullWidth
            defaultValue={extendedDescription}
            value={formExtendedDescription}
            onChange={onChangeExtendedDescription}
          />
          {/* Ability to associate files with cards only allowed in edit mode */}
          {console.log(dialogInformation)}
          {dialogInformation.edit &&
            <> 
            <br/> 
            <MultiselectCheckbox 
              files={props.files}
              updateFilesToAssociate={updateFilesToAssociate}
            /> 
            </>
          }
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogConfirm(formTitle, formDescription, formExtendedDescription, filesToAssociate)} color="primary">
            Confirm
          </Button>
          
        </DialogActions>
      </Dialog>
    )
}

export default DialogPortfolioCard;