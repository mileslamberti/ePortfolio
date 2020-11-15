import React, { useState, useEffect }from 'react';
import axios from 'axios';

import {makeStyles, Card, CardContent, Typography, IconButton, Input, FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
import {Edit, Add, Delete} from '@material-ui/icons';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from  '@material-ui/core/DialogContentText';


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
    const [message, setMessage] = useState("");

    // Whether delete warning dialog is open
    const [warningOpen, setWarningOpen] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [warningOn, setWarningOn] = useState(true);

    useEffect( () => {
        setLoading(true);
        axios.get(API_URL + `/${props.profileHandle}/experience`)
            .then( res => {
                setExperiences(res.data.experiences);
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
        setMessage('');
    };
    const handleClickDelete = (index) => {
        var updatedExperiences = [ ...experiences ];
        updatedExperiences.splice(index, 1);
        axios.post(API_URL+'/experience', {experiences: updatedExperiences}, { headers: authHeader() })
            .then( res => {
                setExperiences(updatedExperiences);
            });
    };
    const handleClose = () => {
        setSelectedExperience('')
        setUpdatedExperience('')
        setOpen(false);
        setMessage('');

    };

    const handleCancel = () => {
        setSelectedExperience('')
        setUpdatedExperience('')
        setOpen(false);
        setMessage('');

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
    const inCorrectFormat = (form) => {
        console.log(form);
        const isNum = /^\d+$/.test(form.date);
        if ( !isNum ) {
            setMessage("Date field must be a year");
            return false;
        } else {
            const num = parseInt(form.date, 10);
            const date = new Date()
            if (num < 1900 ) {
                setMessage("Date field must be within recent years");
                return false;
            } else if ( num > date.getFullYear()+1) {
                setMessage("Date field cannot be more than 2 years in the future");
                return false;
            }
        }
        setMessage('');
        return true;
    }
    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff
        if (inCorrectFormat(updatedExperience)){
            var updatedExperiences = experiences;
            if (addingNew){
                updatedExperiences.push(updatedExperience)
            } else {
                updatedExperiences[selectedExperience] = updatedExperience;
            }
            axios.post(API_URL+'/experience', {experiences: updatedExperiences}, { headers: authHeader() })
                .then( res => {
                    setExperiences(updatedExperiences);
                    handleClose();
                });
        }
        
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
                    <IconButton onClick={() => handleClickOpen(index)}> <Edit  /> </IconButton>
                    <IconButton onClick={() => {
                        if(warningOn === false){
                            handleClickDelete(index);
                        }
                        else{
                            setWarningOpen(true)
                        }
                    }}> <Delete  /> </IconButton>
                    <Dialog open={warningOpen} onClose={() => setWarningOpen(false)}>
                        <DialogTitle id="form-dialog-title"> Are you sure you want to delete?</DialogTitle>
                        <DialogContentText>
                            <Typography gutterBottom>
                                Deleting this will delete a portion of your work history. Are you sure you wish to proceed?
                            </Typography>
                            <Typography>
                                Press confirm to delete.
                            </Typography>
                            
                        </DialogContentText>
                        <FormGroup row>
                            <FormControlLabel 
                            control={<Checkbox checked={checkbox} onClick={() => setCheckbox(!checkbox)}
                                />}
                            label="Do not show again"
                            />
                        </FormGroup>
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setWarningOpen(false)}
                        >
                                Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if(checkbox === true){
                                    setWarningOn(false);
                                }
                                handleClickDelete(index);
                                setWarningOpen(false);
                            }}
                            startIcon={<Delete />}
                        >
                            Confirm Delete
                        </Button>
                    </Dialog>
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
                            <DialogTitle id="form-dialog-title">Edit work experience</DialogTitle>
                            <DialogContent className={classes.marginAutoItem}>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Date</InputLabel>
                                    <Input onChange={onChangeDate} defaultValue={getDefaultVals().date}/></FormControl>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Comapany name</InputLabel>
                                    <Input onChange={onChangeCompanyName} defaultValue={getDefaultVals().companyName}/></FormControl>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Job title</InputLabel>
                                    <Input onChange={onChangeJobTitle} defaultValue={getDefaultVals().jobTitle}/></FormControl>
                                <FormControl className={classes.alignItemsAndJustifyContent}>
                                    <InputLabel htmlFor="component-helper">Job description</InputLabel>
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
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Dialog>
                </> : <></>}
            </>
            }
        </div>
    )
}

export default Experience;