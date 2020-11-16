import React, { useState, useEffect } from "react";
import axios from "../../api";
import { makeStyles, ButtonBase, Tooltip } from "@material-ui/core";

import authHeader from "../../services/auth-header";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  image: {
    width: 300,
    height: 300,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const DP = (props) => {
  const [loading, setLoading] = useState(false);
  const [authorised, setAuthorised] = useState(props.authorised);
  const [DP, setDP] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setAuthorised(props.authorised);

    if (!DP) {
      setLoading(true);

      axios
        .get("/" + props.profileHandle + "/dp")
        .then((res) => {
          setDP(res.data.profilePic);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [props]);

  const onChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image, image.name);

    setLoading(true);
    axios
      .post("/user/image", formData)
      .then((res) => {
        let req = res.data.image;
        axios.post("/dp", req, { headers: authHeader() });
        setDP(res.data.image);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {loading ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : (
        <>
          {authorised ? (
            <>
              <input
                className={classes.input}
                ccept="image/*"
                id="icon-button-file"
                type="file"
                onChange={onChange}
              />
              <label htmlFor="icon-button-file">
                <Tooltip title="Change profile picture">
                  <ButtonBase
                    className={classes.image}
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <img className={classes.img} src={DP} />
                  </ButtonBase>
                </Tooltip>
              </label>
            </>
          ) : (
            <img className={classes.img} src={DP} />
          )}
        </>
      )}
    </div>
  );
};
export default DP;
