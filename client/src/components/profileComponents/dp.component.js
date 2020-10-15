import React, { useState, useEffect } from 'react';
import Axios from "axios";

import UserService from "../../services/user.service";

import {makeStyles, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        display: 'none',
    },
    image: {
        width: 300,
        height: 300,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

const DP = () => {

    const [loading, setLoading] = useState(false);
    const [DP, setDP] = useState("");
    const classes = useStyles();
    
    useEffect(() => {
        setLoading(true)
        UserService.getMe().then(
            (me) => {
                setDP(me.imageUrl);
                setLoading(false);
            }
        )
    }, []);

    const onChange = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("file", image, image.name);
        
        setLoading(true);
        Axios.post(
          "http://localhost:5000/eportfolio-4760f/us-central1/api/user/image",
          formData
        )
          .then((res) => {
            UserService.updateProfilePic(res.data.image);
            setDP(res.data.image);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
          
      }

    return (
        <div>
            {loading ? <span className="spinner-border spinner-border-sm"></span> :
            <>
                <input className={classes.input} ccept="image/*" id="icon-button-file" type="file" onChange={onChange}/>
                <label htmlFor="icon-button-file">
                    <ButtonBase className={classes.image} color="primary" aria-label="upload picture" component="span">
                        <img className={classes.img} src={DP} />
                    </ButtonBase> 
                </label>
            </>
            }
        </div>
    );
    
};
export default DP;