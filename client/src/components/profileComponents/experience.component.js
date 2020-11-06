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

const Experience = () => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [experiences, setExperience] = useState("");
    const [updatedExperience, setUpdatedExperience] = useState("");

    useEffect( () => {
        setLoading(true);
        axios.get(API_URL + "/experience", { headers: authHeader() })
            .then( res => {
                console.log(res);
                setExperience(res.data.experiences);
                setUpdatedExperience(res.data.experiences);
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
        setUpdatedExperience(experiences);
        setOpen(false);
    };

    const onChangeStartDate = (e) => {
        setUpdatedExperience({...updatedExperience, startDate: e.target.value});
    }
    const onChangeEndDate = (e) => {
        setUpdatedExperience({...updatedExperience, endDate: e.target.value});
    }
    const onChangeCompanyName = (e) => {
        setUpdatedExperience({...updatedExperience, companyName: e.target.value});
    }
    const onChangeJobTitle = (e) => {
        setUpdatedExperience({...updatedExperience, jobTitle: e.target.value});
    }
    const onChangeJobDescription = (e) => {
        setUpdatedExperience({...updatedExperience, jobDescription: e.target.value});
    }


    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff

        axios.post(API_URL+'/experience', updatedExperience, { headers: authHeader() })
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
                    <Typography className={classes.typography} color="textSecondary" component="p">{experiences.startDate}</Typography>
                    <Typography className={classes.typography} color="textSecondary" component="p">{experiences.companyName}</Typography>
                    <Typography className={classes.typography} color="textSecondary" component="p">{experiences.jobTitle}</Typography>
                    <Typography className={classes.typography} color="textSecondary" component="p">{experiences.jobDescription}</Typography>
                    <Typography className={classes.typography} color="textSecondary" component="p">{experiences.endDate}</Typography>

            </CardContent>
            </Card>
            <IconButton> <Edit onClick={handleClickOpen} /> </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
                    <DialogContent className={classes.marginAutoItem}>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Start Date</InputLabel>
                            <Input onChange={onChangeStartDate}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">End Date</InputLabel>
                            <Input onChange={onChangeEndDate}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Comapany Name</InputLabel>
                            <Input onChange={onChangeCompanyName}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Job Title</InputLabel>
                            <Input onChange={onChangeJobTitle}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Job Description</InputLabel>
                            <Input onChange={onChangeJobDescription}/></FormControl>    
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

export default Experience;