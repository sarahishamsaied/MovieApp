import React, { Component, Fragment } from "react";
import style from "../Search/Search.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as BsIcons from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidermenu from "../Sidermenu/Sidermenu";
import Card from "../Card/Card";
class Search extends Component {
  baseUrl = "https://image.tmdb.org/t/p/w500";
  one =
    "https://api.themoviedb.org/3/movie/popular?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff";
  two =
    "https://api.themoviedb.org/3/trending/tv/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff";
  state = {
    filteredData: [],
    searchTerm: "",
    searchTitle: "",
  };
  // ===================================== Sending Multiple Requests using AXIOS =======================================
  getAllMovies = () => {
    const requestOne = axios.get(this.one);
    const requestTwo = axios.get(this.two);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          responses[0] = responses[0].data.results;
          responses[1] = responses[1].data.results;
          // console.log(responseOne.data.results)
          this.setState({ filteredData: [...responses[0], ...responses[1]] });
          console.log(this.state.filteredData);
        })
      )
      .catch((errors) => console.log(errors));
  };
  // =====================================================================================================================
  // getMovies = async()=>{
  //     let {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff');
  //     this.setState({filteredData:data.results})
  //  }
  componentDidMount() {
    this.getAllMovies();
    this.getTv();
  }
  getTv = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff"
    );
    this.setState({ filteredData: data.results });
  };
  //  getPeople = async()=>{
  //     let {data} = await axios.get('https://api.themoviedb.org/3/person/popular?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US&page=1');
  //     this.setState({filteredData:data.results})

  //     console.log(this.state.filteredData)
  //  }
  render() {
    return (
      <Fragment>
        <Sidermenu />
        <div className={style.searchSection}>
          <h1
            className={
              "text-center text-white display-1 fw-bold " + style.title
            }
          >
            What Are You Looking For?
          </h1>
          <div className={style.inputContainer}>
            <input
              type="text"
              placeholder="Enter your keyword here"
              className={style.inputControl}
              onChange={(e) => {
                this.setState({
                  searchTerm: e.target.value,
                  searchTitle: "Search Results: ",
                });
                console.log(this.state.searchTerm);
              }}
            />
            <BsIcons.BsSearch
              className={style.searchIcon}
              onClick={() => {
                window.scrollTo(0, 900);
              }}
            />
          </div>
          <select
            className={style.selectionControl + " d-inline-block"}
            name=""
            id=""
            onChange={(e) => {
              if (e.target.value == "movies") this.getAllMovies();
              else if (e.target.value == "tv") this.getTv();
            }}
          >
            <option value="movies">Movies</option>
            <option value="tv">Tv</option>
          </select>
        </div>
        <div className="resultsContainer p-5">
          <h1 className="display-4 text-white text-center">
            {this.state.searchTitle}
          </h1>
          <div className={"row p-5"}>
            {this.state.filteredData
              .filter((val) => {
                if (this.state.searchTerm === "") return;
                let truthyVal = val.name || val.original_title || val.title;
                if (
                  truthyVal
                    .toLowerCase()
                    .includes(this.state.searchTerm.toLowerCase())
                )
                  return val;
              })
              .map((val) => {
                console.log(val);
                let truthyVal = val.name || val.original_title || val.title;
                return <Card val={val} name={truthyVal} />;
              })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Search;
