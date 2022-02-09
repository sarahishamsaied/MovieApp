import React, { Component } from "react";
import { Fragment } from "react";
import axios from "axios";
import style from "../Details/Details.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Rating from "react-rating";
import * as BiIcons from "react-icons/bi";
import Recommend from "../Recommendations/Recommend";
import Cast from "../Cast/Cast";
import Loading from "../Loading/Loading";
class Details extends Component {
  constructor() {
    super();
    window.scrollTo(0, 0);
  }
  baseUrl = "https://image.tmdb.org/t/p/w500";
  state = {
    itemData: {},
    genres: [],
    productionCompanies: [],
    cast: [],
    isDeatilsLoaded: false,
    isCastLoaded: false,
  };
  getCast = async () => {
    let id = this.props.match.params.id;
    let category = this.props.match.params.cat;
    let itemCast;
    if (category == "movie")
      itemCast = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/credits?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US"
      );
    if (category == "tv")
      itemCast = await axios.get(
        "https://api.themoviedb.org/3/tv/" +
          id +
          "/credits?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US"
      );
    this.setState({ cast: itemCast.data.cast, isCastLoaded: true });
    console.log(this.state.cast);
  };
  getDetails = async () => {
    let id = this.props.match.params.id;
    let category = this.props.match.params.cat;
    let itemDetail;
    let itemCast;
    console.log(this.props);
    console.log(category);
    if (category == "movie") {
      itemDetail = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff"
      );
    }
    if (category === "tv") {
      itemDetail = await axios.get(
        "https://api.themoviedb.org/3/tv/" +
          id +
          "?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff"
      );
    }
    this.setState({
      itemData: itemDetail.data,
      genres: itemDetail.data.genres,
      productionCompanies: itemDetail.data.production_companies,
      isDeatilsLoaded: true,
    });
  };
  backButtonHandler = () => {
    this.props.history.goBack();
  };
  //Short Circuiting
  title = (arg1, arg2) => {
    return arg1 || arg2;
  };
  componentDidMount() {
    this.getCast();
    this.getDetails();
    this.setState({ isDeatilsLoaded: true });
  }
  render() {
    // console.log(this.state.genres)
    // console.log(this.state.itemData)
    if (!this.state.isDeatilsLoaded || !this.state.isCastLoaded)
      return <Loading />;
    else
      return (
        <Fragment>
          <div className={style.itemContainer}>
            <div className="row justify-content-center">
              <div
                className={
                  "mt-5 col-lg-7 col-md-12 col-sm-12 p-5 d-flex flex-column justify-content-space-around " +
                  style.details
                }
              >
                <h1 className="display-5 text-white fw-bold">
                  <BiIcons.BiArrowBack
                    className={style.backArrow + " mr-5 my-5"}
                    onClick={this.backButtonHandler}
                  />
                  {this.title(
                    this.state.itemData.original_title,
                    this.state.itemData.name
                  )}
                </h1>
                <p className="text-white h4 fw-light px-4 w-50">
                  {" "}
                  <span className="text-danger">Release Date: </span>{" "}
                  {this.state.itemData.release_date ||
                    this.state.itemData.first_air_date}
                </p>
                <p className={style.overview + " text-white p-5"}>
                  {this.state.itemData.overview}
                </p>
                <h3 className="fw-bold mt-4 text-white">Rating</h3>
                <ul className={style.list}>
                  <li>
                    <Rating
                      initialRating={this.state.itemData.vote_average / 2}
                      readonly
                      emptySymbol="fa fa-star-o fa-1x"
                      fullSymbol="fa fa-star fa-1x"
                      className={style.genreList}
                    />
                  </li>
                </ul>
                <h3 className="fw-bold mt-4 text-white">Genres</h3>
                <ul className={style.list}>
                  {this.state.genres.map((val) => {
                    return (
                      <li className={style.genreList} key={val.id}>
                        {val.name}
                      </li>
                    );
                  })}
                </ul>
                <h3 className="fw-bold mt-4 text-white">
                  Production Companies
                </h3>
                <ul className={style.list + " mb-4"}>
                  {/* <li className={'fw-bold '+style.genreList}>Production Comapnies: </li> */}
                  {this.state.productionCompanies.map((val) => {
                    return (
                      <li
                        className={style.genreList + " " + style.genreListItem}
                        key={val.id}
                      >
                        {val.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className={style.imgContainer + " col-lg-4 col-md-5 col-sm-5"}
              >
                <img
                  className="img-fluid"
                  src={this.baseUrl + this.state.itemData.poster_path}
                  alt=""
                />
              </div>
            </div>
          </div>
          <Recommend
            cat={this.props.match.params.cat}
            id={this.props.match.params.id}
          />
          <Cast cast={this.state.cast} />
        </Fragment>
      );
  }
}
export default Details;
