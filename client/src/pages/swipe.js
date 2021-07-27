import React, { useState, useEffect } from "react";
import TinderCardComponent from "../components/TinderCard/tindercard";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import API from "../utils/API";
import "../components/TinderCard/tindercard.css";
import Header from "../components/TinderCard/header.js";

//TO-DO: SET CUSTOM TIME DELAY SO NO SWIPES DO NOT RECYCLE IMMEDIATELY

const Swipe = () => {
  const [swipes, setSwipes] = useState([]);
  const [formObject, setFormObject] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth)
  };
  const breakpoint = 480;

  // Load all swipes and store them with swipeCards
  useEffect(() => {
    swipeCards();
  }, []);

  // Rerender mobile layout according to current screen width
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);


  // Loads all swipes and sets them to API
  function swipeCards() {
    API.Swipe.getSwipe()
      .then((res) => {
        console.log(res);
        setSwipes(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center">
        <div style={{position: 'relative', top: '-70px'}}>
        <Row style={{marginBottom: '5rem'}}>
          <TinderCardComponent swipes={swipes} />
        </Row>
        {width < breakpoint ? (
        <></>
        ) : (
        <Row
          className="d-flex justify-content-center align-items-center"
        >
          {/* <span className="mt-5">
            <Button className="mx-5 py-2" variant="danger" size="lg" style={{ width: "8rem" }}>
              No
            </Button>
            <Button className="mx-5 py-2" variant="info" size="lg" style={{ width: "8rem" }}>
              Yes
            </Button>
          </span> */}
        </Row>)}
        </div>
      </Container>
    </>
  );
};

//populate the sample data
//grab users from our database and display it
//style page
//write API REQUEST IN ROUTES THAT PULLS IN INFO

export default Swipe;
