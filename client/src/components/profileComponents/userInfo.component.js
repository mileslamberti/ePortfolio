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

const UserInfo = () => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const [updatedUserInfo, setUpdatedUserInfo] = useState("");

    useEffect( () => {
        setLoading(true);
        axios.get(API_URL + "/userinfo", { headers: authHeader() })
            .then( res => {
                console.log(res);
                setUserInfo(res.data.userInfo);
                setUpdatedUserInfo(res.data.userInfo);
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
            <IconButton> <Edit onClick={handleClickOpen} /> </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
                    <DialogContent className={classes.marginAutoItem}>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Occupation</InputLabel>
                            <Input onChange={onChangeOccupation}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Location</InputLabel>
                            <Input onChange={onChangeLocation}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Contact number</InputLabel>
                            <Input onChange={onChangeNumber}/></FormControl>
                        <FormControl className={classes.alignItemsAndJustifyContent}>
                            <InputLabel htmlFor="component-helper">Contact email address</InputLabel>
                            <Input onChange={onChangeEmail}/></FormControl>    
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

export default UserInfo;