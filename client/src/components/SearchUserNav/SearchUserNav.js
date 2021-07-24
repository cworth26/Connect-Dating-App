import React, { useState } from "react";
import "./searchusernav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SearchModal from "../../components/SearchModal/SearchModal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SortByEl from "../../components/SearchUserNav/SortBy/SortByEl";
import SwipeDateEl from "./SwipeDate/SwipeDateEl";
import LocationEl from "../../components/SearchUserNav/Location/LocationEl";
import DatingStatusEl from "../../components/SearchUserNav/DatingStatus/DatingStatusEl";
import AgeEl from "../../components/SearchUserNav/Age/AgeEl";
import CompatibilityEl from "../../components/SearchUserNav/Compatibility/CompatibilityEl";
import GenderEl from "../../components/SearchUserNav/Gender/GenderEl";

const SearchUserNav = () => {
    const categories = ["Swipe Date", "Location", "Dating Status", "Age", "Compatibility", "Gender"];

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (e) => {
        setShowModal(true);
        setModalTitle(e.target.innerHTML)
    }

    function componentSwitch() {
        switch(modalTitle) {
            case "Swipe Date": return <SwipeDateEl />;
            case "Location": return <LocationEl />;
            case "Dating Status": return <DatingStatusEl />;
            case "Age": return <AgeEl />;
            case "Compatibility": return <CompatibilityEl />;
            case "Gender": return <GenderEl />;
            default: return <p>No setting by that name!</p>
        }
    }


  return <div className="nav navbar">
      <ul className="nav">
          <li className="list-item" id="sort-by-el">
              <SortByEl />
          </li>
            {categories.map((category) =>
            <li className="list-item">
              <Button className="btn btn-primary py-1 px-2"
              onClick={handleShowModal}>{category}</Button>
          </li>
          )}
      </ul>
      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                {componentSwitch()}
          </Modal.Body>
          <Modal.Footer>
            <Button className="py-1 px-2" variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button className="py-1 px-2" variant="primary" onClick={handleCloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
</div>;
};

export default SearchUserNav;
