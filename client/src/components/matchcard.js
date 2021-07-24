import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "cloudinary-react";
import { Link } from 'react-router-dom';
import "./matchcard.css"

const Matchcard = props => {

    return (
        <div class="col-sm- col-lg-4" id="match-card-container">
              <div class="match-list match-grid" id="card">
                <div class="match-list-image">
                <Image
                  publicId={props.publicId}
                  crop="scale"
                  cloudName="dyvqfdd5w"
                />
                </div>
                <div class="match-list-details">
                  <div class="match-list-info">
                    <div class="match-list-title">
                      <h5>
                      <Link to={`/user/${props.username}`}> {props.firstName} {props.lastName && props.lastName}, {props.age}</Link>
                      </h5>
                    </div>
                    <div class="match-list-option">
                      <ul class="list-unstyled">
                        <li>Pronouns: {props.pronouns}</li>
                        <li class="w-100">
                        <FontAwesomeIcon icon="map-marker" /> Location:
                          {props.location}
                        </li>
                        <li id="bio">
                          Interests: {props.interests}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="match-list-favourite-time">
                    <a class="match-list-favourite order-2" href="#" style={{position: 'relative', top: '10px'}}>
                      <FontAwesomeIcon icon="heart"/>
                    </a>
                    <span class="match-list-time order-1">
                      <i class="far fa-clock pr-1"></i>{props.lastonline}
                      <div
                        class="d-grid gap-2"
                        role="group"
                        aria-label="Basic example"
                      >
                          <a href ={`/chat/${props.account}`}>
                        <button type="button" class="btn btn-primary py-1 px-2" style={{position: 'relative', top: '-10px'}}>
                          Let's Connect
                        </button>
                        </a>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Matchcard;