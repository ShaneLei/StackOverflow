import React, { Component } from "react";
import user_stackoverflow from "../../img/user_stackoverflow.jpeg";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import vote_1 from "../../img/vote_1.png";
import vote_2 from "../../img/vote_2.png";
import vote_3 from "../../img/vote_3.png";
import vote_4 from "../../img/vote_4.png";
import vote_5 from "../../img/vote_5.png";
import vote_6 from "../../img/vote_6.png";
import vote_7 from "../../img/vote_7.png";
import vote_8 from "../../img/vote_8.png";

var signal = false;

var bodyElement = document.querySelector("body");

var xDirection = "";
var yDirection = "";

var oldX = 0;
var oldY = 0;

var count = 0;

class Stackoverflow extends Component {
  constructor() {
    super();

    this.logScroll = this.logScroll.bind(this);
    this.logAskClick = this.logAskClick.bind(this);
    this.logNewestClick = this.logNewestClick.bind(this);
    this.logVotesClick = this.logVotesClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.logScroll);

    bodyElement.addEventListener("mousemove", this.getMouseDirection, false);
  }

  // Post to api to store mouseMove
  getMouseDirection = e => {
    if (oldX < e.pageX && e.pageX - oldX > 300) {
      xDirection = "right";
      oldX = e.pageX;
      console.log(xDirection);
      count++;
    } else if (oldX >= e.pageX && oldX - e.pageX > 300) {
      xDirection = "left";
      oldX = e.pageX;
      console.log(xDirection);
      count++;
    }

    const { user } = this.props.auth;
    const email = {
      email: user.email
    };
    if (count == 2) {
      axios
        .post("/api/stackoverflow/mouseMove", email)
        .then(res => console.log("1 left and 1 right mouse move"))
        .catch(err => console.log(err));

      count = 0;
    }
    // //deal with the horizontal case
    // if (oldX < e.pageX && e.page - oldX > 100) {
    //   xDirection = "right";
    // } else if (oldX >= e.pageX && oldX - e.pageX > 100) {
    //   xDirection = "left";
    // } //deal with the vertical case
    // if (oldY < e.pageY && e.pageY - oldY > 100) {
    //   yDirection = "down";
    // } else if (oldY >= e.pageY && oldY - e.pageY > 100) {
    //   yDirection = "up";
    // }
    // oldX = e.pageX;
    // oldY = e.pageY;
    // console.log(xDirection + " " + yDirection);
  };

  // Post to api to store scroll
  logScroll = e => {
    e.preventDefault();
    var posY = parseInt(e.currentTarget.scrollY);
    const { user } = this.props.auth;
    const email = {
      email: user.email
    };
    if (signal == false && posY > 300) {
      signal = true;
      axios
        .post("/api/stackoverflow/scroll", email)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
    if (signal == true && posY < 100) {
      signal = false;
      axios
        .post("/api/stackoverflow/scroll", email)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.logScroll);

    window.removeEventListener("mousemove", this.getMouseDirection);
  }

  // Post to api to store askClick
  logAskClick(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const email = {
      email: user.email
    };
    axios
      .post("/api/stackoverflow/askClick", email)
      .then(res => console.log("1 askClick"))
      .catch(err => console.log(err));
  }

  // Post to api to store newestClick
  logNewestClick(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const email = {
      email: user.email
    };
    axios
      .post("/api/stackoverflow/newestClick", email)
      .then(res => console.log("1 newestClick"))
      .catch(err => console.log(err));
  }

  // Post to api to store votesClick
  logVotesClick(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const email = {
      email: user.email
    };
    axios
      .post("/api/stackoverflow/votesClick", email)
      .then(res => console.log("1 votesClick"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container" logScroll={this.logScroll}>
        <h2>Questions tagged [java]</h2>
        <button
          type="button"
          className="btn btn-primary"
          style={{ float: "right", margin: "10px" }}
          onClick={this.logAskClick}
        >
          Ask Question
        </button>
        <br />
        <p>
          Java (not to be confused with JavaScript or JScript or JS) is a
          general-purpose object-oriented programming language designed to be
          used in conjunction with the Java Virtual Machine (JVM). "Java
          platform" is the name for a computing system that has installed tools
          for developing and running Java ...
        </p>
        <p>
          Tip: Use the "media-right" className to right-align the media object.
        </p>
        <hr />

        <div>
          <p className="il">1,458,495 questions</p>
          <nav aria-label="Page navigation example" className="il">
            <ul className="pagination right ">
              <li className="page-item">
                <a className="page-link" href="#">
                  Info
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={this.logNewestClick}>
                  Newest
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Featured
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Frequent
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" onClick={this.logVotesClick}>
                  Votes
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Active
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Unanswered
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <br />
        <hr />

        {/*Right-aligned media object */}
        <div className="media">
          <img
            class="align-self-center mr-3"
            src={vote_1}
            alt="Generic placeholder image"
            style={{ width: "60px" }}
          />
          <div className="media-body">
            <h4 className="media-heading">Left-aligned</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="media-right">
            <img
              src={user_stackoverflow}
              className="media-object"
              style={{ width: "60px" }}
            />
          </div>
        </div>
        <hr />

        {/* Right-aligned media object */}
        <div className="media">
          <img
            class="align-self-center mr-3"
            src={vote_2}
            alt="Generic placeholder image"
            style={{ width: "60px" }}
          />
          <div className="media-body">
            <h4 className="media-heading">Right-aligned</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="media-right">
            <img
              src={user_stackoverflow}
              className="media-object"
              style={{ width: "60px" }}
            />
          </div>
        </div>
        <hr />

        <div className="media">
          <img
            class="align-self-center mr-3"
            src={vote_3}
            alt="Generic placeholder image"
            style={{ width: "60px" }}
          />
          <div className="media-body">
            <h4 className="media-heading">Right-aligned</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="media-right">
            <img
              src={user_stackoverflow}
              className="media-object"
              style={{ width: "60px" }}
            />
          </div>
        </div>
        <hr />

        <div className="media">
          <img
            class="align-self-center mr-3"
            src={vote_4}
            alt="Generic placeholder image"
            style={{ width: "60px" }}
          />
          <div className="media-body">
            <h4 className="media-heading">Right-aligned</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="media-right">
            <img
              src={user_stackoverflow}
              className="media-object"
              style={{ width: "60px" }}
            />
          </div>
        </div>
        <hr />

        <div className="media">
          <img
            class="align-self-center mr-3"
            src={vote_3}
            alt="Generic placeholder image"
            style={{ width: "60px" }}
          />
          <div className="media-body">
            <h4 className="media-heading">Right-aligned</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="media-right">
            <img
              src={user_stackoverflow}
              className="media-object"
              style={{ width: "60px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Stackoverflow.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Stackoverflow);
