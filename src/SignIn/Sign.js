import React from "react";
import * as FaBIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as FcIcons from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../context/UserAuthContext";
import { Alert, Form } from "react-bootstrap";

import "./modules.Sign.css";
import { useHistory } from "react-router-dom";

function Sign() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn, googleSignIn, facebookSignIn } = useUserAuth();
  const navigate = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate.push("/movies");
    } catch {
      setError("username or password invalid");
    }
  };
  const handleGoogle = async (e) => {
    try {
      e.preventDefault();

      await googleSignIn();
      navigate.push("/movies");
    } catch {
      setError("username or password invalid");
    }
  };
  const handlefacebook = async (e) => {
    try {
      e.preventDefault();

      await facebookSignIn();
      navigate.push("/movies");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <section className="section-signIN">
        <Form onSubmit={handleSubmit} className="signContainer">
          <div className="l-side">
            <div className="BodyContainer">
              <div className="platfrom-container">
                <div className="login-word">
                  <h1>login with</h1>
                </div>
                <div className="platform">
                  <button onClick={handleGoogle}>
                    <FcIcons.FcGoogle />

                    <span>google</span>
                  </button>
                  <button onClick={handlefacebook}>
                    <FaBIcons.FaFacebookF />
                    <span>facebook</span>
                  </button>
                </div>
                <div className="or-word">
                  <span>or</span>
                </div>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}

              <div className="signBody">
                <span>username</span>
                <input
                  type="text"
                  className="inputs"
                  required
                  placeholder="enter your username"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
                <span>password</span>
                <input
                  className="inputs"
                  type="password"
                  required
                  placeholder="enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <button className="login-btn">log in</button>
                <div className="signup">
                  <span>don't have account?</span>
                  <Link to="/signup">sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="r-side"></div>
      </section>
    </>
  );
}

export default Sign;
