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

const Education = (props) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [educations, setEducations] = useState([]);
    const [updatedEducation, setUpdatedEducation] = useState('');
    const [selectedEducation, setSelectedEducation] = useState('');
    const [addingNew, setAddingNew] = useState(false);
    const [authorised, setAuthorised] = useState(props.authorised);

    // Whether delete warning dialog is open
    const [warningOpen, setWarningOpen] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [warningOn, setWarningOn] = useState(true);

    useEffect( () => {
        setLoading(true);
        
        axios.get(API_URL +`/${props.profileHandle}/education`)
            .then( res => {
                setEducations(res.data.educations);
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
        setSelectedEducation(index);
        setUpdatedEducation(educations[index])
        setOpen(true);
    };
    const handleClickDelete = (index) => {
        var updatedEducations = [ ...educations ];
        updatedEducations.splice(index, 1);
        axios.post(API_URL+'/education', {education: updatedEducations}, { headers: authHeader() })
            .then( res => {
                setEducations(updatedEducations);
            });
    };
    
    const handleClose = () => {
        setSelectedEducation('');
        setUpdatedEducation('')
        setOpen(false);
    };

    const handleCancel = () => {
        setSelectedEducation('');
        setUpdatedEducation('')
        setOpen(false);
    };
    const handleAddEducation = () => {
        setAddingNew(true);
        setOpen(true);
    }
    const onChangeWhen = (e) => {
        setUpdatedEducation({...updatedEducation, when: e.target.value});
    }
    const onChangeWhere = (e) => {
        setUpdatedEducation({...updatedEducation, where: e.target.value});
    }
    const onChangeWhat = (e) => {
        setUpdatedEducation({...updatedEducation, what: e.target.value});
    }

    const getDefaultVals = () => {
        let defaultVals = {};
        if (selectedEducation === '') {
            defaultVals.when = '';
            defaultVals.where = '';
            defaultVals.what ='';
        } else {
            defaultVals.when = educations[selectedEducation].when;
            defaultVals.where = educations[selectedEducation].where;
            defaultVals.what = educations[selectedEducation].what;
        }
        return defaultVals;
    }
    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff
        var updatedEducations = educations;
        if ( addingNew) {
            updatedEducations.push(updatedEducation)
        } else {
            updatedEducations[selectedEducation] = updatedEducation;
        }
        axios.post(API_URL+'/education', {education: updatedEducations}, { headers: authHeader() })
            .then( res => {
                setEducations(updatedEducations);
                handleClose();
            });
    }
    const renderEducation = (education, index) => {
        return (
            <>
                <Card>
                    <CardContent>
                        <Typography className={classes.typography} color="textSecondary" component="p">{education.when}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{education.where}</Typography>
                        <Typography className={classes.typography} color="textSecondary" component="p">{education.what}</Typography>
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
                                Deleting this will delete a portion of your education history. Are you sure you wish to proceed?
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
                </>: <></>}
            </>
        )
    }
    return (
            <div>
            {loading ? <span className="spinner-border spinner-border-sm"></span> :
            <> 
            {educations.map(renderEducation)}
            <br/>
            { authorised ? 
                <>
                    <IconButton> <Add onClick={handleAddEducation} /> </IconButton>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit education history</DialogTitle>
                        <DialogContent className={classes.marginAutoItem}>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Year of completion</InputLabel>
                                <Input onChange={onChangeWhen} defaultValue={getDefaultVals().when}/></FormControl>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Name of institution</InputLabel>
                                <Input onChange={onChangeWhere} defaultValue={getDefaultVals().where}/></FormControl>
                            <FormControl className={classes.alignItemsAndJustifyContent}>
                                <InputLabel htmlFor="component-helper">Degree</InputLabel>
                                <Input onChange={onChangeWhat} defaultValue={getDefaultVals().what}/></FormControl>  
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
                </>: <></>}
                 
            </>}
        </div>
    )
}

export default Education;