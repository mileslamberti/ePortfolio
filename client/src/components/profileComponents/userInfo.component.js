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
          fontSize: "0.7rem"
      }
});

const UserInfo = (props) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [authorised, setAuthorised] = useState(props.authorised);
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const [updatedUserInfo, setUpdatedUserInfo] = useState("");

    useEffect( () => {
        setAuthorised(props.authorised);

        if(!userInfo){
            setLoading(true);

            axios.post(API_URL + "/getuserinfo", {handle : props.profileHandle})
                .then( res => {
                    console.log(res);
                    setUserInfo(res.data.userInfo);
                    setUpdatedUserInfo(res.data.userInfo);
                    setLoading(false);
                })
                .catch( err => {
                    console.log(err);
                    setLoading(false);
                })
        } 

    }, [props]);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setUpdatedUserInfo(userInfo);
        setOpen(false);
    };

    const onChangeOccupation = (e) => {
        setUpdatedUserInfo({...updatedUserInfo, occupation: e.target.value});
    }
    const onChangeLocation = (e) => {
        setUpdatedUserInfo({...updatedUserInfo, location: e.target.value});
    }
    const onChangeNumber = (e) => {
        setUpdatedUserInfo({...updatedUserInfo, number: e.target.value});
    }
    const onChangeEmail = (e) => {
        setUpdatedUserInfo({...updatedUserInfo, email: e.target.value});
    }

    // This function handles the case for freshly registered users, whose content is set to the default...
    // which acts as a placeholder on the page. This default placeholder is clunky to act as a defaultValue...
    // in the input fields
    const getDefaultVals = (vals) => {
        let defaultVals = Object.assign({}, vals);
        
        if (defaultVals.occupation === "Occupation"){ defaultVals.occupation = ""; }
        if (defaultVals.location === "Location"){ defaultVals.location = ""; }
        if (defaultVals.number === "Phone number"){ defaultVals.number = ""; }
        if (defaultVals.email === "Contact email"){ defaultVals.email = ""; }

        return defaultVals;
    }

    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff

        axios.post(API_URL+'/userinfo', updatedUserInfo, { headers: authHeader() })
            .then( res => {
                setUserInfo(updatedUserInfo);
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
                        <Typography className={classes.typography} color="textSecondary" component="p">{userInfo.occupation}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{userInfo.location}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{userInfo.number}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{userInfo.email}</Typography>
                </CardContent>
                </Card>
                {authorised ? (<>
                    <IconButton> <Edit onClick={handleClickOpen} /> </IconButton>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
                        <DialogContent className={classes.marginAutoItem}>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Occupation</InputLabel>
                                <Input onChange={onChangeOccupation} defaultValue={getDefaultVals(userInfo).occupation}/></FormControl>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Location</InputLabel>
                                <Input onChange={onChangeLocation} defaultValue={getDefaultVals(userInfo).location}/></FormControl>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Contact number</InputLabel>
                                <Input onChange={onChangeNumber} defaultValue={getDefaultVals(userInfo).number}/></FormControl>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Contact email address</InputLabel>
                                <Input onChange={onChangeEmail} defaultValue={getDefaultVals(userInfo).email}/></FormControl>
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
                </>) : (<></>)}
            </>
            }
        </div>
    )
}

export default UserInfo;