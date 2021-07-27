import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LOADING, SET_USER } from "../../store/actions";
import { useStoreContext } from "../../store/store";
import "./help.css";
import emailjs from "emailjs-com";

const Help = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_upld0n3",
        "template_vyjd6k4",
        e.target,
        "user_VGRqbXjGwdNwwhPNY7iVS"
      )
      .then((res) => {
        setName("");
        setEmail("");
        setMessage("");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
      <div
        className="container border"
        style={{
          marginTop: "50px",
          width: "50%",
          backgroundImage: `url('https://cdn.pixabay.com/photo/2016/08/23/10/45/network-1614045_960_720.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 style={{ marginTop: "25px" }}>Connect with us</h1>
        <form
          className="row"
          style={{ margin: "25px 85px 75px 100px" }}
          onSubmit={sendEmail}
        >
          <label>Name</label>
          <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" />
          <label>Email</label>
          <input onChange={e => setEmail(e.target.value)} value={email} type="email" name="user_email" className="form-control" />
          <label>Message</label>
          <textarea onChange={e => setMessage(e.target.value)} value={message} type="message" rows="4" className="form-control" />
          <input
            type="submit"
            value="Send"
            className="form-control btn btn-secondary"
            style={{ marginTop: "30px" }}
          />
        </form>
      </div>
  );
};

export default Help;