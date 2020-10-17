import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import MultiselectCheckbox from "./MultiselectCheckbox.component";

function DialogPortfolioCard(props){

    const {handleDialogConfirm, handleDialogCancel, open, title, subtitle, description, dialogInformation} = props
    const [formTitle, setFormTitle] = useState(title);
    const [formSubtitle, setFormSubtitle] = useState(subtitle);
    const [formDescription, setFormDescription] = useState(description);
    const [filesToAssociate, setFilesToAssociate] = useState([])


    const updateFilesToAssociate = (fs) =>{
        setFilesToAssociate(fs);
    }

    const onChangeTitle = (e) => {
        setFormTitle(e.target.value);
    }

    const onChangeSubtitle = (e) => {
        setFormSubtitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setFormDescription(e.target.value);
    }

    const handleCancelClick = () =>{
        setFormTitle(title);
        setFormSubtitle(subtitle);
        setFormDescription(description);
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
            value={formTitle}
            onChange={onChangeTitle}
          />
          <TextField
            margin="dense"
            id="subtitle"
            label="Subtitle of Card"
            fullWidth
            value={formSubtitle}
            onChange={onChangeSubtitle}
          />
        <TextField
            margin="dense"
            id="description"
            label="Description (visible in when pressing dropdown button)"
            fullWidth
            value={formDescription}
            onChange={onChangeDescription}
          />
          {/* Ability to associate files with cards only allowed in edit mode */}
          {dialogInformation.edit &&
            <> 
            <br/> 
            <MultiselectCheckbox 
              files={props.files}
              cardId={props.cardid}
              updateFilesToAssociate={updateFilesToAssociate}
            /> 
            </>
          }
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogConfirm(formTitle, formSubtitle, formDescription, filesToAssociate)} color="primary">
            Confirm
          </Button>
          
        </DialogActions>
      </Dialog>
    )
}

export default DialogPortfolioCard;