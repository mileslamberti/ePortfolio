import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import SelectPicture from "./selectPicture.component";

import MultiselectCheckbox from "./MultiselectCheckbox.component";

function DialogPortfolioCard(props){

    const {handleDialogConfirm, handleDialogCancel, open, title, subtitle, description, displayPicture, dialogInformation} = props
    const [formTitle, setFormTitle] = useState(title);
    const [formSubtitle, setFormSubtitle] = useState(subtitle);
    const [formDescription, setFormDescription] = useState(description);
    const [filesToAssociate, setFilesToAssociate] = useState([])
    const [currentDisplayPicture, setCurrentDisplayPicture] = useState(displayPicture)
    const [editDPOpen, setEditDPOpen] = useState(false)

    // whether user is logged it
    const [authorised, setAuthorised] = useState(false);
    useEffect(() => {
      setAuthorised(props.authorised)
    },[props]);

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
        setCurrentDisplayPicture(displayPicture);
        setFilesToAssociate([]);
        handleDialogCancel();
    }

    return(
      <div>
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
          <br/>
        <SelectPicture
          currentDisplayPicture={currentDisplayPicture}
          setParentDisplayPicture={setCurrentDisplayPicture}
          editDPOpen={editDPOpen}
          setEditDPOpen={setEditDPOpen}
        />
        </DialogContent>
        {!editDPOpen ? <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
              handleDialogConfirm(formTitle, formSubtitle, formDescription, filesToAssociate, currentDisplayPicture);
              { if (props.addingNew) {
                setFormDescription('');
                setFormSubtitle('');
                setFormTitle('');
              }}
            }} 
            color="primary">
            Confirm
          </Button>
          
        </DialogActions>
       : <></>}
       </Dialog>
      </div>
    )
}

export default DialogPortfolioCard;