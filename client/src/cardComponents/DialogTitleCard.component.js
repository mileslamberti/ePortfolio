import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {PortfolioCardContext} from "./portfolioCardContext";


function DiaglogTitleCard(props){
    const { projectInfo } = useContext(PortfolioCardContext);

    const {handleDialogConfirm, handleDialogCancel, open} = props
    const [formTitle, setFormTitle] = useState(projectInfo.title);
    const [formDescription, setFormDescription] = useState(projectInfo.description);
    
    const onChangeTitle = (e) => {
        setFormTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setFormDescription(e.target.value);
    }

    const handleCancelClick = () =>{
        setFormTitle(projectInfo.title);
        setFormDescription(projectInfo.description);
        handleDialogCancel();
    }
    

    return(
        <Dialog open={open} onClose={handleCancelClick} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Title and Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the title and description of your project, enter the new title and description below and press confirm.
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Title of Project"
            fullWidth
            value={formTitle}
            onChange={onChangeTitle}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description of Project"
            fullWidth
            value={formDescription}
            onChange={onChangeDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogConfirm(formTitle, formDescription)} color="primary">
            Confirm
          </Button>
          
        </DialogActions>
      </Dialog>
    )
}

export default DiaglogTitleCard;