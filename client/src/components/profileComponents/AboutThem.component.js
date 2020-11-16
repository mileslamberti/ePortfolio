import React, { useState, useEffect } from "react";
import axios from "../../api";

export default function AboutThem(props) {
  // TODO REMOVEEE BAD BAD BAD BAD
  const searchedUser = props.location.pathname.split("/")[1];
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    axios
      .get(`/${searchedUser}`)
      .then((res) => {
        console.log(res);
        setDisplayName(res.data.aboutMe.displayName);
        setDescription(res.data.aboutMe.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>{displayName}</h2>
      <h3>{description}</h3>
    </div>
  );
}
