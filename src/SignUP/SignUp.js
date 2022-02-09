import React from "react";
import * as FaBIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as FcIcons from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./modules.SignUp.css";
import { useUserAuth } from "../context/UserAuthContext";
import { Alert, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, stError] = useState("");
  const navigate = useHistory();
  const { signUp } = useUserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      try {
        await signUp(email, password);
        navigate.push("/");
      } catch (err) {
        stError(err.message);
      }
    } else {
      stError("passwords do not match");
    }
  };
  return (
    <>
      <section className="MainSignup">
        <div className="left-side">
          <Form onSubmit={handleSubmit} className="signup-container">
            <div className="switch-container">
              <Link to={"/signup"}>signup</Link>

              <Link to="/">login</Link>
            </div>
            <div className="h1-signup">
              <h1>sign up</h1>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="Name-container">
              <div className="sec-container">
                <div className="their-container">
                  <div className="name">
                    <input placeholder="first name"></input>

                    <input placeholder="last name"></input>
                  </div>
                  <div className="emailfield">
                    <input
                      type="email"
                      placeholder="email address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      placeholder="set password"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                    <input
                      type="password"
                      placeholder="confirm password"
                      required
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="signup-btn-container">
                    <div className="signup-btn">
                      <button type="submit">get started</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="right-side"></div>
      </section>
    </>
  );
}

export default SignUp;
