import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Hello, {this.props.auth.user.username}</h1>
                <p>This is a demo / concept project</p>
                <p>Profile Features Coming Soon</p>
                <button id="back"><Link to="/board">Back To Notes</Link></button>
            </div>
        );
    }
}

export default connect(state => ({auth: state.auth}), null)(Profile)