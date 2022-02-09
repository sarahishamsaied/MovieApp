import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import logo from "../Images/logo2.svg";
import * as RiIcons from "react-icons/ri";
class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className={style.appContainer}>
          <h1 className={"display-6 p-4 text-white " + style.appLogo}>
            <RiIcons.RiMovie2Line />
            Movie App
          </h1>
          <div className={style.homeContainer}>
            <div className={style.content}>
              <h1 className={style.title + " text-white fw-bold"}>AVENGERS:</h1>
              <h1 className={style.title + " text-white fw-bold"}>END GAME</h1>
              <Link to={"/signup"} className={style.bttn}>
                Sign Up
              </Link>
              <Link to={"/signin"} className={style.bttn}>
                Sign In
              </Link>
            </div>
            <div className={style.appTitle}>
              <h1 className={style.sectionTitle}>
                Thounsands of Movies and Tv Shows.
              </h1>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
