import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signup } from '../redux/auth'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            userInput: {
                name: "",
                username: "",
                password: ""
            }
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState((prevState)=>({
            userInput:{
                ...prevState.userInput,
                [e.target.name]: e.target.value
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signup(this.state.userInput)
        this.setState({
            userInput: {
                name: "",
                username: "",
                password: ""
            }
        })
    }

    render() {
        let errMessage = this.props.auth.authError.signup
        
        return (
            <div className = "formContainer">
                <h1 className="title">Register</h1>
                <form className="inputForm" onSubmit = { this.handleSubmit }>
                    <input type = "text"
                            name = "name"
                            value = {this.state.userInput.name}
                            placeholder = "Name" 
                            onChange = {this.handleChange} />

                    <input type = "text"
                            name = "username"
                            value = {this.state.userInput.username}
                            placeholder = "Username"
                            onChange = {this.handleChange} />

                    <input type = "text"
                            name = "password"
                            value = {this.state.userInput.password}
                            placeholder = "Password"
                            onChange = {this.handleChange} />
                            
                    <button className="inputButton">Submit</button>
                </form>
                <p>{errMessage}</p>
            </div>
        );
    }
}

export default connect(state => state, { signup })(Register);