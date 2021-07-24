import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap/";
// import Interest from "../InterestsCard/InterestTag/interestTag";
import DTDiv from "../Settings/Desktop View/DTDiv/DTDiv";
import MobileDiv from "../mobileDiv";
import { Link } from "react-router-dom";
import InterestsCard from "../Settings/InterestsCard/InterestsCard";
import axios from "axios";
import PartnerPrefCard from "../Settings/PartnerPrefCard/PartnerPrefCard";
import ImageCard from "../Settings/ImageCard/ImageCard";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import ProfileBio from "./ProfileBio/ProfileBio";
import ProfileInterests from "./ProfileInterests/ProfileInterests";
import ProfileImage from "./ProfileImage/ImageCard";

const DTProfile = () => {
  //state obj containing needed userdata to fill out card
  //need state data to be named after each card
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    pronouns: "",
    location: "",
    orientation: "",
    status: "",
    bio: "",
    interests: "",
    agePref: "",
    genderPref: "",
  });

  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;
    axios.get(`/api/users/${username}`).then((data) => {
      setUserData({
        firstName: `${data.data.firstName}`,
        lastName: `${data.data.lastName}`,
        username: `${data.data.username}`,
        age: `${data.data.age}`,
        pronouns: `${data.data.pronouns}`,
        location: `${data.data.location}`,
        gender: `${data.data.gender}`,
        sexuality: `${data.data.sexuality}`,
        status: `${data.data.status}`,
        bio: `${data.data.bio}`,
        interests: `${data.data.interests}`,
        agePref: `${data.data.agePref}`,
        genderPref: `${data.data.genderPref}`,
        profileImg: `${data.data.profileImg.url}`
      });
      console.log("useEffect setUserData results:", data);
    });
  }, [reRender]);

  return (
    <div>
      <div className="text-center mt-4 px-5" style={{ overflowX: "hidden" }}>
        {/* <h1 style={{ marginTop: "1rem" }}>Edit Profile</h1> */}
        <Row className="py-5 px-3">
          <Col md={6} className="d-flex justify-content-center align-items-center">
          <ProfileImage profileImg={userData.profileImg}/>
          </Col>
          <Col md={6}>
            <DTDiv>
              <Row style={{ marginBottom: "1rem" }}>
                <ProfileIntro
                  setReRender={setReRender}
                  reRender={reRender}
                  firstName={userData.firstName}
                  lastName={userData.lastName}
                  username={userData.username}
                  age={userData.age}
                  location={userData.location}
                  gender={userData.gender}
                  pronouns={userData.pronouns}
                  sexuality={userData.sexuality}
                  status={userData.status}
                  agePref={userData.agePref}
                  genderPref={userData.genderPref}
                />
              </Row>
            </DTDiv>
            <Row>
              <ProfileBio
                bio={userData.bio}
                setReRender={setReRender}
                reRender={reRender}
              />
            </Row>
            <Row>
              <ProfileInterests
                interests={userData.interests}
                setReRender={setReRender}
                reRender={reRender}
              />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DTProfile;