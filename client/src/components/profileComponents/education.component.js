import React, { useState, useEffect }from 'react';
import axios from 'axios';

import {makeStyles, Card, CardContent, Typography, IconButton, Input, FormControl, InputLabel} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const useStyles = makeStyles({
      marginAutoItem: {
        margin: 'auto'
      },
      alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
      },
      typography: {
          fontSize: "1rem"
      }
});

const Education = () => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [educations, setExperience] = useState("");
    const [updatedExperience, setUpdatedExperience] = useState("");

    useEffect( () => {
        setLoading(true);
        axios.get(API_URL + "/education", { headers: authHeader() })
            .then( res => {
                console.log(res);
                setExperience(res.data.educations);
                setUpdatedExperience(res.data.educations);
                setLoading(false);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setUpdatedExperience(educations);
        setOpen(false);
    };

    const onChangeWhen = (e) => {
        setUpdatedExperience({...updatedExperience, when: e.target.value});
    }
    const onChangeWhere = (e) => {
        setUpdatedExperience({...updatedExperience, where: e.target.value});
    }
    const onChangeWhat = (e) => {
        setUpdatedExperience({...updatedExperience, what: e.target.value});
    }


    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff

        axios.post(API_URL+'/education', updatedExperience, { headers: authHeader() })
            .then( res => {
                setExperience(updatedExperience);
                console.log(res.data);
                handleClose();
            });
    }
    
    return (
            <div>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 
            <>
            <Card>
            <CardContent>
                    <Typography className={classes.typography} color="textSecondary" component="p">{educations.when}</Typography>
                    <Typography className={classes.typography} color="textSecondary" component="p">{educations.where}</Typography>
                    <Typography className={classes.typography} color="textSecondary" component="p">{educations.what}</Typography>
            </CardContent>
            </Card>
            <IconButton> <Edit onClick={handleClickOpen} /> </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
                    <DialogContent className={classes.marginAutoItem}>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Date of completion</InputLabel>
                            <Input onChange={onChangeWhen} defaultValue={educations.when}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Name of Institution</InputLabel>
                            <Input onChange={onChangeWhere} defaultValue={educations.where}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Degree</InputLabel>
                            <Input onChange={onChangeWhat} defaultValue={educations.what}/></FormControl>  
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={onSubmit} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>        
            </>
            }
        </div>
    )
}

export default Education;