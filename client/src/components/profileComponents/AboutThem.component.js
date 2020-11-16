import React, { useState, useEffect } from "react";
import axios from "../../api";

export default function AboutThem(props) {
  // TODO REMOVEEE BAD BAD BAD BAD
  const searchedUser = props.location.pathname.split("/")[1];
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    axios
      .get(`/${searchedUser}`)
      .then((res) => {
        console.log(res);
        setDisplayName(res.data.aboutMe.displayName);
        setDescription(res.data.aboutMe.description);
        setBio(res.data.aboutMe.bio);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>{displayName}</h2>
      <h3>{description}</h3>
      <h3>{bio}</h3>
    </div>
  );
}
