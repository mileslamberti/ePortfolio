import React from "react";
import axios from "../api";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap";

function ProfilesPage() {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get("/profiles")
      .then((res) => {
        res.data.users.forEach((user) => {
          getProfileInfo(user);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderProfileCard = (handle, aboutMe, index) => {
    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <Card style={{ width: "18rem" }} key={index}>
          <Card.Img
            variant="top"
            src="holder.js/100px180"
            src={aboutMe.image}
          />
          <Card.Body>
            <Card.Title>{aboutMe.displayName}</Card.Title>
            <Card.Text>{aboutMe.description}</Card.Text>
            <Card.Text>{aboutMe.handle}</Card.Text>
            <Button href={`/${aboutMe.handle}`} variant="primary">
              View Profile
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };
  const saveProfileCard = (handle, aboutMe) => {
    const newProfile = {
      image: "",
      displayName: aboutMe.displayName,
      handle: handle,
      description: aboutMe.handle,
    };
    setProfiles((profiles) => profiles.concat([newProfile]));
  };
  const getProfileInfo = (handle) => {
    axios
      .get(`/${handle}`)
      .then((res) => {
        switch (res.status) {
          case 200:
            saveProfileCard(handle, res.data.aboutMe);
            break;
          case 204:
            // user has no about me
            break;
        }
      })
      .catch((err) => console.log(err));
  };
  const filteredProfiles = profiles.filter((profile) => {
    return profile.handle.includes(search);
  });

  const renderCard = (card, index) => {
    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <Card style={{ width: "18rem" }} key={index}>
          <Card.Img variant="top" src="holder.js/100px180" src={card.image} />
          <Card.Body>
            <Card.Title>{card.displayName}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
            <Card.Text>{card.handle}</Card.Text>
            <Button href={`/${card.handle}`} variant="primary">
              View Profile
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">{filteredProfiles.map(renderCard)}</div>
    </div>
  );
}
export default ProfilesPage;
