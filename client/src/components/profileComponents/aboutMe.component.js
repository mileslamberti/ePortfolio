import React, { useState, useEffect }from 'react';
import axios from 'axios';

import {CardHeader, CardContent, Typography, IconButton, Input, FormControl, InputLabel} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import authHeader from "../../services/auth-header";


const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const AboutMe = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [aboutMe, setAboutMe] = useState("");
    const [updatedAboutMe, setUpdatedAboutMe] = useState("");

    useEffect( () => {
        setLoading(true);
        axios.get(API_URL + "/aboutme", { headers: authHeader() })
            .then( res => {
                console.log(res);
                setAboutMe(res.data.aboutMe);
                setUpdatedAboutMe(res.data.aboutMe);
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
        setUpdatedAboutMe(aboutMe);
        setOpen(false);
    };

    const onChangeDisplayName = (e) => {
        setUpdatedAboutMe({...updatedAboutMe, displayName: e.target.value});
    }
    const onChangeDescription = (e) => {
        setUpdatedAboutMe({...updatedAboutMe, description: e.target.value});
    }


    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff

        axios.post(API_URL+'/aboutme', updatedAboutMe, { headers: authHeader() })
            .then( res => {
                setAboutMe(updatedAboutMe);
                console.log(res.data);
                handleClose();
            });
    }
    
    return (
            <div>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 
            <>
            <CardContent>
                <CardHeader title={aboutMe.displayName} />
                    <Typography variant="h6" color="textSecondary" component="p">{aboutMe.description}</Typography>
            </CardContent>
            <IconButton> <Edit onClick={handleClickOpen} /> </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit about me</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <InputLabel htmlFor="component-helper">Display Name</InputLabel>
                            <Input defaultValue={aboutMe.displayName} onChange={onChangeDisplayName}/></FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-helper">Profile description</InputLabel>
                            <Input defaultValue={aboutMe.description} onChange={onChangeDescription}/></FormControl>
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

export default AboutMe;