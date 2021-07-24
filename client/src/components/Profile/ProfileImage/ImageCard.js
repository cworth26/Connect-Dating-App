import React from 'react';
import { Col } from 'react-bootstrap/';
import DTDiv from '../../Settings/Desktop View/DTDiv/DTDiv';

const ProfileImage = ({username, profileImg}) => {
    return (
        <Col className="image-col" md={5} id="edit-profile-image">
            <DTDiv>
              <div style={{ maxWidth: `80rem` }} id="img-col-div">
                <img
                  className="img-fluid rounded-circle"
                  src={profileImg}
                  style={{ maxWidth: "400px", height: "400px" }}
                />
              </div>
            </DTDiv>
          </Col>
    )
}

export default ProfileImage;
