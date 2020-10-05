import React, {useState, useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogPortfolioCard(props){

    const {handleClickOpen, handleDialogConfirm, handleDialogCancel, open, title, description, extendedDescription} = props
    const [formTitle, setFormTitle] = useState(title);
    const [formDescription, setFormDescription] = useState(description);
    const [formExtendedDescription, setFormExtendedDescription] = useState(extendedDescription);


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
        handleDialogCancel();
    }

    return(
        <Dialog open={open} onClose={handleCancelClick} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Card Contents</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the contents of this cards, change the values in the respective fields and press confirm.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogConfirm(formTitle, formDescription, formExtendedDescription)} color="primary">
            Confirm
          </Button>
          
        </DialogActions>
      </Dialog>
    )
}

export default DialogPortfolioCard;