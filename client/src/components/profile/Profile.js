import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      lastTime: new Date()
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      const { user } = this.props.auth;
      const name = {
        name: user.name
      };

      axios
        .post("/api/profile", name)
        .then(res => {
          const { time } = res.data;
          this.setState({ lastTime: time });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const { user } = this.props.auth;
    const { lastTime } = this.state;

    return (
      <div className="row">
        <div className="card ml-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <h4 className="card-title">User Name</h4>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">{user.name}</p>
          </div>
        </div>

        <div className="card ml-4" style={{ width: "18rem" }}>
          <div className="card-body">
            <h4 className="card-title">Last Login Time</h4>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">{lastTime.toString()}</p>
          </div>
        </div>
      </div>
    );
  }
}

Profile.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Profile);
