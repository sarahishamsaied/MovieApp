import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "../Movies/Movies.module.css";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import * as BsIcons from "react-icons/bs";
import Rating from "react-rating";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";
import { useState } from "react";
function Card(props) {
  let baseUrl = "https://image.tmdb.org/t/p/w500";
  let value = props.val;
  let truthyVal = props.name;
  let history = useHistory();
  // console.log(history)
  const goToItemHandler = () => {
    console.log(history);
    history.replace("/details/" + value.media_type + "/" + value.id);
    history.go(0);
  };
  return (
    <Fragment>
      <div
        className={"col-md-6 col-sm-12 col-lg-3 my-5 " + style.item}
        key={value.id}
      >
        <div className={style.imgContainer}>
          <div className={style.overlay} onClick={goToItemHandler}>
            <AiIcons.AiFillPlayCircle
              className={style.playBttn + " text-danger"}
            />
          </div>

          <img
            src={baseUrl + value.poster_path}
            className="img-fluid"
            alt="not available"
          />
        </div>
        <h1 className={style.title + " " + style.itemTitle}>
          {truthyVal.length > 26
            ? truthyVal.split(" ").slice(0, 2).join(" ") + "-.."
            : truthyVal}
        </h1>
        <div className="">
          <h1 className={"fw-light text-muted " + style.title}>
            Release Date: {value.release_date}
            {value.first_air_date}
          </h1>
          <span>
            <h1 htmlFor="" className={"text-muted fw-light " + style.title}>
              Rating:{" "}
              <Rating
                initialRating={value.vote_average / 2}
                readonly
                emptySymbol="fa fa-star-o fa-1x"
                fullSymbol="fa fa-star fa-1x"
                stop={5}
                className={
                  "text-muted col-lg-7 col-md-10 col-sm-10" + style.rating
                }
              />
            </h1>
          </span>
        </div>
        <button className="btn btn-danger" onClick={goToItemHandler}>
          Details
        </button>
      </div>
    </Fragment>
  );
}

export default Card;
