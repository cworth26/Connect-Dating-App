import React, { useState, useEffect } from "react";
import EditIcon from "../Icon/Icon";
import MobileDiv from "../../mobileDiv";
import { Row, Col } from "react-bootstrap/";
import SaveButton from "../SaveButton/SaveButton";
import axios from "axios";

import "./biocard.css";

const BioCard = ({ bio, username, reRender, setReRender }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    bio
  })

  const onChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserInfo({ ...updatedUserInfo, [name]: value });
  };

  useEffect(() => {
    console.log("updatedUserInfo value:",updatedUserInfo);
  }, [updatedUserInfo])

  useEffect(() => {
    setUpdatedUserInfo({bio})
  }, [bio])

  const saveChanges = () => {
    axios
      .put(`/api/users/${username}`, updatedUserInfo)
      .then((data) => {
        setIsEditing(false);
        setReRender(!reRender);
      });
  };


  return (
    <MobileDiv>
      <Row >
        <Col></Col>
        <Col xs={8}>
          <h5>Bio</h5>
        </Col>
        <Col>
          <EditIcon isEditing={isEditing} setIsEditing={setIsEditing} />
        </Col>
      </Row>
      <Row>
        {isEditing ? (
          <div className="bio">
            <textarea
              placeholder={bio}
              className="bio"
              onChange={e => onChange(e)}
              id="bio"
              name="bio"
              value={updatedUserInfo.bio}
              rows="5"
              cols="60"
            />
            <div>
              <SaveButton saveChanges={saveChanges}/>
            </div>
          </div>
        ) : (
          <div className="bio">
            <p className="lead" style={{ margin: "0" }}>
              {updatedUserInfo.bio}
            </p>
          </div>
        )}
      </Row>
    </MobileDiv>
  );
};

export default BioCard;
