import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
class Cast extends Component {
  baseUrl = "https://image.tmdb.org/t/p/w500";
  allCast = this.props.cast;
  render() {
    console.log(this.allCast);
    return (
      <Fragment>
        <div className="container">
          <h1 className="text-white mb-3">Cast</h1>
          <div className="row">
            {this.allCast.map((value, index) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-2 my-3 p-3"
                  key={value.id}
                >
                  <img
                    src={this.baseUrl + value.profile_path}
                    alt="image not available"
                    className="img-fluid fs-3 my-5 text-left fw-light bg-dark"
                  />
                  <p className="text-white mt-4 fw-light h5">{value.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Cast;
