import React, { useState } from "react";
import { Col } from "react-bootstrap/";
import DTDiv from "../Desktop View/DTDiv/DTDiv";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import SpinnerEl from "../../Spinner";
import { Image } from "cloudinary-react";

const ImageCard = ({ username, public_id, reRender, setReRender }) => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Col
      className="img-col d-flex justify-content-center align-items-center"
      md={5}
      id="edit-profile-image"
    >
      <DTDiv>
        <div style={{ maxWidth: `80rem` }} id="img-col-div">
            <Image
              publicId={public_id}
              width="400"
              height="400"
              crop="scale"
              cloudName="dyvqfdd5w"
              style={{
                borderRadius: '50%',
              }}
            />
        </div>
        {loading ? (
            <div className="d-flex justify-content-center" style={{ width: "315px", height: "315px", marginLeft: '4rem', marginTop: '3rem'}}>
              <SpinnerEl />
            </div>
          ) : (
        <UploadPhoto
          username={username}
          setReRender={setReRender}
          setLoading={setLoading}
          setLoaded={setLoaded}
        />)}
      </DTDiv>
    </Col>
  );
};

export default ImageCard;
