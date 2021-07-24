import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { LOADING, SET_USER } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import Matchcard from "../../components/matchcard";
import API from "../../utils/API";
import SearchUserNav from "../../components/SearchUserNav/SearchUserNav";
import "./searchuser.css";
import SortByEl from "../../components/SearchUserNav/SortBy/SortByEl";
import Pagination from "../../components/Pagination/Pagination";

let singleTrueRange = 0;

const SearchUsers = () => {
  const [currentFilter, setCurrentFilter] = useState();

  //   .filter((user) =>
  //   ageRanges
  //     .filter((range, index) => activeAgeRange[index])
  //     .filter(
  //       (trueRange) => (singleTrueRange = trueRange.split("-")),

  //       user.age > singleTrueRange[0] &&
  //         user.age < singleTrueRange[1]
  //     )
  // )

  const [matches, setMatches] = useState(null);

  const getMatchData = async () => {
    const matchData = await API.Match.findAllMatchesModified();

    console.log(matchData.data);
    setMatches(matchData.data);
  };

  useEffect(() => {
    getMatchData();
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <SearchUserNav />
      </Row>
      <Row>
        {matches &&
          matches.map((user) => (
            <Matchcard
              firstName={user.firstName}
              lastName={user.lastName}
              age={user.age}
              location={user.location}
              interests={user.interests}
              pronouns={user.pronouns}
              username={user.username}
              publicId={user.profileImg.public_id}
            />
          ))}
      </Row>
      <Row>
        <Pagination />
      </Row>
    </Container>
  );
};

export default SearchUsers;
