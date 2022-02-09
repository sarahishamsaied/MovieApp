import React, { Fragment } from "react";
import * as FaBIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as BiIcons from "react-icons/bi";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Component } from "react";
import Sidermenu from "../Sidermenu/Sidermenu";
import Card from "../Card/Card";
import style from "../Favorites/Fav.module.css";
class Fav extends Component {
  baseUrl = "https://image.tmdb.org/t/p/w500";

  render() {
    return (
      <Fragment>
        <Sidermenu />

        <div className={"container " + style.container}>
          <h1 className="text-white display-3 my-4">
            <Link to={"/movies"}>
              <BiIcons.BiArrowBack className="text-danger" />
            </Link>{" "}
            Favorites:{" "}
          </h1>
          <div className="row pt-5">
            {this.props.favorites.map((val) => {
              let truthyVal = val.name || val.original_title || val.title;
              return (
                <Card
                  val={val}
                  name={truthyVal}
                  key={val.id}
                  className={style.card}
                  cat={val.media_type}
                />
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Fav;
