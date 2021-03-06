import React, { useState, useEffect } from "react";
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';
import "./profile.component.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../api";
import { Button, Grid, Icon } from "@material-ui/core/";

import { IconButton } from "@material-ui/core";
import {Edit, Add, Delete, Help} from '@material-ui/icons';
import {
  Dialog,
  Typography,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import UserInfo from "./profileComponents/userInfo.component";
import Experience from "./profileComponents/experience.component";
import Education from "./profileComponents/education.component";
import Tags from "./profileComponents/tags.component";
import UserService from "../services/user.service";

import ProjectPanel from "../cardComponents/projectPanel.component";


export default function MyProfile(props) {
  const profileHandle = props.match.params.handle;
  const [authorised, setAuthorised] = useState(false);
  const [priv, setPriv] = useState(true);
  const [loading, setLoading] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authRes = await UserService.isUser(profileHandle);
      const privRes = await axios.get("/" + profileHandle + "/private");
      setAuthorised(authRes);
      setPriv(privRes.data.private);
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  return (

    <div >
    {authorised ? (
      <IconButton
        variant="contained"
        onClick={() => setHelpOpen(true)}
      >
        <Help/>
      </IconButton>
    ) : (
      <></>
    )}
    <Grid item xs={6}>
      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)}>
        <DialogContent>
          <DialogTitle id="form-dialog-title">
            How start off your profile
          </DialogTitle>
          <DialogContentText>
            <Typography gutterBottom>
              To Edit press
            </Typography>
            <Typography gutterBottom>
               <Edit/>
            </Typography>
            <Typography gutterBottom>
              To Delete press
            </Typography>
            <Typography gutterBottom>
              <Delete/>
            </Typography>
            <Typography gutterBottom>
              To Add press
            </Typography>
            <Typography gutterBottom>
              <Add/>
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>  
    </Grid>
    <div>
      {loading ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : (
        <>
          {priv && !authorised ? (
            <body>
              Oops! It looks like this user doesn't exist, or their profile is
              hidden.
            </body>
          ) : (
            <>
              <div class="profile">
                <div class="profile_left">
                  <div class="img_here">
                    <DP authorised={authorised} profileHandle={profileHandle} />
                  </div>
                  <div class="profile_content">
                    <div class="profile_item profile_info">
                      <UserInfo
                        authorised={authorised}
                        profileHandle={profileHandle}
                      />
                    </div>
                    <div class="profile_item profile_education">
                      <div class="title">
                        <p class="bold">Education</p>
                      </div>
                          <Education
                            authorised={authorised}
                            profileHandle={profileHandle}
                          />
                    </div>
                    <div class="profile_item profile_skills">
                      <div class="title">
                        <p class="bold">skills</p>
                        <div>
                          <Tags
                            authorised={authorised}
                            profileHandle={profileHandle}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="profile_right">
                  <div class="profile_item profile_about">
                    <AboutMe
                      authorised={authorised}
                      profileHandle={profileHandle}
                    />
                  </div>
                  <div class="profile_item profile_work">
                    <div class="title">
                      <p class="bold">Work Experience</p>
                    </div>
                        <Experience
                          authorised={authorised}
                          profileHandle={profileHandle}
                        />
                  </div>
                  <div class="profile_item profile_education">
                    <div class="title">
                      <p class="bold">Projects</p>
                    </div>
                    <ProjectPanel
                      authorised={authorised}
                      profileHandle={profileHandle}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
}
