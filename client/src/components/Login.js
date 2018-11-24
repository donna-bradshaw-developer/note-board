import React, { Component } from 'react';
import { connect } from "react-redux"
import { login } from "../redux/auth"

class Login extends Component {
    constructor(){
        super()
        this.state = {
            userInput:{
                username: "",
                password: ""
            },
            errMessage: false
        }
    }

    handleChange = e =>{
        e.persist()
        this.setState((prevState)=>({
            userInput:{
                ...prevState.userInput,
                [e.target.name]: e.target.value
            }
        }))
    }

    handleSubmit = e =>{
        e.preventDefault()
        this.props.login(this.state.userInput)
        this.setState((prevState)=>({
            userInput:{
                username: "",
                password: ""
            }, 
            errMessage: !prevState.errMessage
        }))
    }
   
    render() {
        
        return (
            <div className = "formContainer">
                <h1 className="title">Login</h1>
                <form className="inputForm" onSubmit={this.handleSubmit}>
                    <input type="text"
                            value = {this.state.userInput.username}
                            name='username'
                            placeholder = 'Username'
                            onChange = {this.handleChange} />

                    <input type="text"
                            value = {this.state.userInput.password}
                            name='password'
                            placeholder = 'Password'
                            onChange = {this.handleChange} />
                    <button className="inputButton">Submit</button>
                </form>
                <p>{this.state.errMessage && this.props.auth.authError.login}</p>
            </div>
        );
    }
}

export default connect( state => state, { login })(Login);