import axios from "axios";
import { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import Details from "../Details/Details";
import { Redirect } from "react-router-dom";
import style from "../Movies/Movies.module.css";
import Sidermenu from "../Sidermenu/Sidermenu";
// import { withRouter } from 'react-router'
class Movies extends Component {
  baseUrl = "https://image.tmdb.org/t/p/w500";
  state = {
    allMovies: [],
    title: "Trending Movies",
    favorites: [],
    type: "movie",
    order: 0,
  };
  getMovies = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff"
    );
    this.setState({ allMovies: data.results, title: "Trending Movies" });
  };
  componentDidMount() {
    this.getMovies();
  }
  movieGenreFilter = async (id) => {
    if (id == 0) return;
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&with_genres=" +
        id
    );
    this.setState({ allMovies: data.results });
  };
  TVGenreFilter = async (id) => {
    if (id == 0) return;
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/discover/tv?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&with_genres=" +
        id
    );
    this.setState({ allMovies: data.results });
  };
  getTv = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff"
    );
    this.setState({ allMovies: data.results, title: "Trending Tv Shows" });
  };
  addToFavorites = (args) => {
    //Removing Duplicates
    //Updating the state

    this.setState({
      favorites: [
        args,
        ...this.state.favorites.filter((val) => {
          return args.id != val.id;
        }),
      ],
    });

    //Lifting The State Up
    this.props.onAddToFavorites([...this.state.favorites]);
  };

  render() {
    let featuringItem = 345940;

    return (
      <Fragment>
        <section className={style.movieHeader}>
          <Sidermenu />
          <BsIcons.BsFillArrowUpCircleFill
            onClick={() => window.scrollTo(0, 0)}
            className={style.scrollUp}
          />
          <div
            className={
              style.movieSectionContent + " p-5 container col-sm-11 col-md-4"
            }
          >
            <h1 className={style.headerTitle + " text-white mb-3"}>The Meg</h1>
            <button
              className={style.discoverButton}
              onClick={() => window.scrollTo(0, 1400)}
            >
              Discover
            </button>
          </div>
          <div className={style.playIcon + " shadow-lg vh-100"}>
            <p className="text-center text-white display-5">Details</p>
            <Link to={"details/movie/" + featuringItem} className="">
              <AiIcons.AiFillPlayCircle />
            </Link>
          </div>
          <div className={style.socialMedia + " d-flex flex-column text-white"}>
            <AiIcons.AiOutlineFacebook className={style.icon} />
            <AiIcons.AiOutlineInstagram className={style.icon} />
            <AiIcons.AiOutlineTwitter className={style.icon} />
          </div>
        </section>
        <div className={style.movieContainer}>
          <h1 className={style.pageTitle + " text-white text-center my-5 "}>
            {" "}
            <BiIcons.BiTrendingUp /> {this.state.title}
          </h1>
          <div className={style.line}></div>
          <select
            className={style.filter}
            name=""
            id=""
            onChange={(e) => {
              if (e.target.value === "tv") {
                this.getTv();
                this.setState({ type: "tv" });
              } else {
                this.getMovies();
                this.setState({ type: "movie" });
              }
            }}
          >
            <option value="0" className="text-muted">
              Filter By
            </option>
            <option value="tv">Tv</option>
            <option value="movies">Movies</option>
          </select>
          {/*--------------------------- Will be replaced with map() function ----------------------------------------------*/}
          <select
            name=""
            id=""
            className={
              this.state.type == "movie"
                ? "text-muted text-secondary " + style.filter
                : "d-none"
            }
            onChange={(e) => {
              this.movieGenreFilter(e.target.value);
            }}
          >
            <option value="0">Pick a Genre</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentry</option>
            <option value="28">Drama</option>
            <option value="10751">Family</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="53">Triller</option>
            <option value="10752">War</option>
          </select>
          <select
            className={
              this.state.type == "tv"
                ? "text-muted text-secondary " + style.filter
                : "d-none"
            }
            onChange={(e) => {
              this.TVGenreFilter(e.target.value);
            }}
          >
            <option value="0">Pick a Genre</option>
            <option value="10759">Action and Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentry</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="10762">Kids</option>
            <option value="9648">Mystery</option>
            <option value="10763">News</option>
            <option value="10764">Reality</option>
            <option value="10765">Sci-Fi and Fantasy</option>
            <option value="10766">Soap</option>
            <option value="10767">Talk</option>
            <option value="10768">War and Politics</option>
          </select>
          {/*--------------------------- Will be replaced by a map() function ----------------------------------------------*/}
          <div className="row p-5 ">
            {this.state.allMovies.map((value, index) => {
              value.media_type = this.state.type;
              let truthyVal = value.title || value.name;
              return (
                <div
                  className={"col-md-6 col-sm-12 col-lg-3 my-5 " + style.item}
                  key={value.id}
                >
                  <div className={style.imgContainer}>
                    <Link to={"details/" + this.state.type + "/" + value.id}>
                      <div className={style.overlay}>
                        <AiIcons.AiFillPlayCircle
                          className={style.playBttn + " text-danger"}
                        />
                      </div>
                    </Link>
                    <img
                      src={this.baseUrl + value.poster_path}
                      className="img-fluid"
                      alt="not available"
                    />
                  </div>
                  <h1 className={style.title + " " + style.itemTitle}>
                    {truthyVal.length > 25
                      ? truthyVal.split(" ").slice(0, 5).join(" ") + "-.."
                      : truthyVal}
                  </h1>
                  <div className="">
                    <h1 className={" fw-light text-muted " + style.title}>
                      Release Date: {value.release_date}
                      {value.first_air_date}
                    </h1>
                    <span>
                      <h1
                        htmlFor=""
                        className={"text-muted fw-light " + style.title}
                      >
                        Rating:{" "}
                        <Rating
                          initialRating={value.vote_average / 2}
                          readonly
                          emptySymbol="fa fa-star-o fa-1x"
                          fullSymbol="fa fa-star fa-1x"
                          stop={5}
                          className={
                            "text-muted col-lg-7 col-md-10 col-sm-10" +
                            style.rating
                          }
                        />
                        <AiIcons.AiFillHeart
                          className={style.heart}
                          onClick={(e) => {
                            this.addToFavorites(value);
                            e.target.style.color = "crimson";
                          }}
                        />
                      </h1>
                    </span>
                  </div>

                  <Link
                    className={
                      style.detailsButton +
                      " btn btn-danger col-lg-4 col-md-3 col-sm-10"
                    }
                    to={"details/" + this.state.type + "/" + value.id}
                  >
                    Details
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Movies;
