import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { LOADING, SET_USER } from "../store/actions";
import { useStoreContext } from "../store/store";
import { SET_MESSAGES, UPDATE_MESSAGES } from "../store/actions";
import { io } from "socket.io-client";
import API from "../utils/API";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";

const Chats = () => {
  const [state, dispatch] = useStoreContext();
  const socket = useRef();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [talkingTo, setTalkingTo] = useState("");
  const [msg, setMsg] = useState("");
  const [haveData, setHaveData] = useState(false);

  const getChatRoomData = async () => {
    try {
      const allMatches = await API.Match.findAllMatches();

      console.log("SET_MESSAGES")
      dispatch({ type: SET_MESSAGES, chatData: allMatches.data})
      setHaveData(!haveData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.current = io();
    getChatRoomData();
    socket.current.on("connection", () => {
      console.log("user connected");
      socket.current.on("disconnect", () => {
        console.log("user disconnected");
      });
  
      socket.current.on("serverMsg", (msgObj) => {
  
        console.log("UPDATE_MESSAGES, serverMsg")
        dispatch({ type: UPDATE_MESSAGES, message: msgObj})
  
      });
    });

  }, []);

  useEffect(() => {
    if (!state.chatRoomData) return;
    const socketRoomNamesArr = state.chatRoomData.map((val) => val.socketRoomName);
    console.log("haveData")
    socket.current.emit("joinManyRooms", socketRoomNamesArr, (obj) => {
      console.log(obj);
    });
  }, [haveData]);

  const handleOnClickRoom = (e, obj, displayName) => {
    e.preventDefault();
    setCurrentRoom(obj);
    setTalkingTo(displayName);
  };

  const handleMsgSubmit = async (e) => {
    e.preventDefault();
    if (!currentRoom || msg.length < 1) return;

    console.log(currentRoom, " -- current room");
    const msgObj = {
      userId: state.user._id,
      name: `${state.user.firstName} ${state.user.lastName}`,
      socketRoomName: currentRoom.socketRoomName,
      msg: msg,
      dateCreated: Date.now()
    };

    socket.current.emit(
      "clientMsg",
      currentRoom.socketRoomName,
      msgObj,
      (obj) => {
        console.log(obj);
      }
    );

    console.log("UPDATE_MESSAGES, handleMsgSubmit")

    dispatch({ type: UPDATE_MESSAGES, message: msgObj})

    setMsg("");

    // save to database

    try {
      const msgUpdate = await API.Match.addMessages(currentRoom._id, {
        userId: state.user._id,
        name: `${state.user.firstName} ${state.user.lastName}`,
        msg: msg
      })
    } catch (err) {
      console.log(err);
    }

  };

  const displayMessages = () => {

    if (!currentRoom) return

    const filteredForCurrent = state.chatRoomData.filter(val => val.socketRoomName === currentRoom.socketRoomName)[0]


    return filteredForCurrent.messages.reverse().map((msgObj, i) => {
                return (
                  <ListGroup.Item
                    className={i % 2 === 0 ? "text-primary" : "text-warning"}
                  >
                    {msgObj.msg}
                  </ListGroup.Item>
                );
              })
  }


  return (
    <Container>
      <Row>
        <Col lg="4">
          <ListGroup className="pr-5">
            {state.chatRoomData &&
              state.chatRoomData.map((obj, index) => {
                let displayName = obj.users[0].name;
                if (obj.users[0].userId._id === state.user._id) {
                  displayName = obj.users[1].name;
                  console.log("displayName", displayName);
                }
                return (
                  <ListGroup.Item
                    action
                    onClick={(e) => handleOnClickRoom(e, obj, displayName)}
                  >
                    {displayName}
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Col>
        <Col lg="8">
          <Row>
            <ListGroup>
              <ListGroup.Item active>{talkingTo}</ListGroup.Item>
                {displayMessages()}
            </ListGroup>
          </Row>
          <Row>
            <Form onSubmit={(e) => handleMsgSubmit(e)}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Send a Message Here"
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                />
              </Form.Group>
              <Button type="submit">Send</Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Chats;
