import React, { useState, useEffect } from "react";
import axios from "../../api";

import {
  CardContent,
  Typography,
  IconButton,
  Input,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import authHeader from "../../services/auth-header";

const AboutMe = (props) => {
  const [loading, setLoading] = useState(false);
  const [authorised, setAuthorised] = useState(props.authorised);
  const [open, setOpen] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [updatedAboutMe, setUpdatedAboutMe] = useState("");

  useEffect(() => {
    setAuthorised(props.authorised);

    if (!aboutMe) {
      setLoading(true);

      axios
        .get(props.profileHandle + "/aboutme")
        .then((res) => {
          console.log(res);
          setAboutMe(res.data.aboutMe);
          setUpdatedAboutMe(res.data.aboutMe);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [props]);

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
    setUpdatedAboutMe({ ...updatedAboutMe, displayName: e.target.value });
  };
  const onChangeDescription = (e) => {
    setUpdatedAboutMe({ ...updatedAboutMe, description: e.target.value });
  };

  // This function handles the case for freshly registered users, whose content is set to the default...
  // which acts as a placeholder on the page. This default placeholder is clunky to act as a defaultValue...
  // in the input fields
  const getDefaultVals = (vals) => {
    let defaultVals = Object.assign({}, vals);

    if (defaultVals.displayName === "Display name") {
      defaultVals.displayName = "";
    }
    if (defaultVals.description === "Profile description") {
      defaultVals.description = "";
    }

    return defaultVals;
  };

  const onSubmit = (e) => {
    e.preventDefault(); // allows us override the default html stuff

    axios
      .post("/aboutme", updatedAboutMe, { headers: authHeader() })
      .then((res) => {
        setAboutMe(updatedAboutMe);
        console.log(res.data);
        handleClose();
      });
  };

  return (
    <div>
      {loading ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : (
        <>
          <CardContent>
            <Typography variant="h3" component="p">
              {aboutMe.displayName}
            </Typography>
            <Typography variant="h4" color="textSecondary" component="p">
              {aboutMe.description}
            </Typography>
          </CardContent>
          {authorised ? (
            <>
              <IconButton>
                {" "}
                <Edit onClick={handleClickOpen} />{" "}
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Edit about me</DialogTitle>
                <DialogContent>
                  <FormControl>
                    <InputLabel htmlFor="component-helper">
                      Display name
                    </InputLabel>
                    <Input
                      onChange={onChangeDisplayName}
                      defaultValue={getDefaultVals(aboutMe).displayName}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="component-helper">
                      Profile description
                    </InputLabel>
                    <Input
                      onChange={onChangeDescription}
                      defaultValue={getDefaultVals(aboutMe).description}
                    />
                  </FormControl>
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
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default AboutMe;
