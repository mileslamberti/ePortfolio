import React, { useState, useEffect }from 'react';
import axios from 'axios';

import {makeStyles, Card, CardContent, Typography, IconButton, Input, FormControl, InputLabel} from '@material-ui/core';
import {Edit, Add, Delete} from '@material-ui/icons';

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

const Experience = (props) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [updatedExperience, setUpdatedExperience] = useState("");
    const [selectedExperience, setSelectedExperience] = useState('');
    const [addingNew, setAddingNew] = useState(false);
    const [authorised, setAuthorised] = useState(props.authorised);

    useEffect( () => {
        setLoading(true);
        axios.get(API_URL + `/${props.profileHandle}/experience`)
            .then( res => {
                console.log(res);
                setExperiences(res.data.experiences);
                console.log(res.data.experiences);
                setLoading(false);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    useEffect( () => {
        setAuthorised(props.authorised);
    }, [props]);
    const handleClickOpen = (index) => {
        setAddingNew(false);
        setSelectedExperience(index);
        setUpdatedExperience(experiences[index])
        setOpen(true);
    };
    const handleClickDelete = (index) => {
        var updatedExperiences = [ ...experiences ];
        updatedExperiences.splice(index, 1);
        axios.post(API_URL+'/experience', {experiences: updatedExperiences}, { headers: authHeader() })
            .then( res => {
                setExperiences(updatedExperiences);
                console.log(res.data);
            });
    };
    const handleClose = () => {
        setSelectedExperience('')
        setUpdatedExperience('')
        setOpen(false);
    };

    const handleCancel = () => {
        setSelectedExperience('')
        setUpdatedExperience('')
        setOpen(false);
    };
    const handleAddExperience = () => {
        setAddingNew(true);
        setOpen(true);
    }
    const onChangeDate = (e) => {
        setUpdatedExperience({...updatedExperience, date: e.target.value});
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
    const getDefaultVals = () => {
        let defaultVals = {};
        if (selectedExperience === '') {
            defaultVals.date = ''
            defaultVals.jobTitle =''
            defaultVals.companyName =''
            defaultVals.jobDescription =''

        } else {
            defaultVals.date = experiences[selectedExperience].date;
            defaultVals.jobTitle =experiences[selectedExperience].jobTitle;
            defaultVals.companyName =experiences[selectedExperience].companyName;
            defaultVals.jobDescription =experiences[selectedExperience].jobDescription;
        }
        return defaultVals;
    }

    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff
        var updatedExperiences = experiences;
        if (addingNew){
            updatedExperiences.push(updatedExperience)
        } else {
            updatedExperiences[selectedExperience] = updatedExperience;
        }
        axios.post(API_URL+'/experience', {experiences: updatedExperiences}, { headers: authHeader() })
            .then( res => {
                setExperiences(updatedExperiences);
                console.log(res.data);
                handleClose();
            });
    }
    const renderExperience = (experience, index) => {
        return (
            <>
                <Card>
                    <CardContent>
                        <Typography className={classes.typography} color="textSecondary" component="p">{experience.date}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{experience.companyName}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{experience.jobTitle}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{experience.jobDescription}</Typography>
                    </CardContent>
                </Card>
                { authorised ? 
                <>
                    <IconButton> <Edit onClick={() => handleClickOpen(index)} /> </IconButton>
                    <IconButton> <Delete onClick={() => handleClickDelete(index)} /> </IconButton>
                </> : <></>}
            </>
        )
    }
    return (
            <div>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 
            <>
            {experiences.map(renderExperience)}
            <br/>
            { authorised ? 
                <>
                    <IconButton> <Add onClick={handleAddExperience} /> </IconButton>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Edit details</DialogTitle>
                            <DialogContent className={classes.marginAutoItem}>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Date</InputLabel>
                                    <Input onChange={onChangeDate} defaultValue={getDefaultVals().date}/></FormControl>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Comapany Name</InputLabel>
                                    <Input onChange={onChangeCompanyName} defaultValue={getDefaultVals().companyName}/></FormControl>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Job Title</InputLabel>
                                    <Input onChange={onChangeJobTitle} defaultValue={getDefaultVals().jobTitle}/></FormControl>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Job Description</InputLabel>
                                    <Input onChange={onChangeJobDescription} defaultValue={getDefaultVals().jobDescription}/></FormControl>    
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
                </> : <></>}
            </>
            }
        </div>
    )
}

export default Experience;