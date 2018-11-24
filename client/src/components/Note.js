import React, { Component } from 'react';
import { FaPencilAlt, FaTrash} from "react-icons/fa";
import EditForm from './EditForm'

class Note extends Component {
    constructor(){
        super()
        this.state = {
            isEditing: false,
            noteInput: ""
        }
    }

    edit = () => {
        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
            noteInput: prevState.noteInput
        }))
    }

    handleEdit = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.update(this.props._id, this.state.noteInput)
        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
            noteInput: ""
        }))
    }

    remove = () => {
        this.props.delete(this.props._id)
    }

    showEditForm = () =>{
        if (this.state.isEditing){
            return (
                <div>
                    <EditForm {...this.props}
                              handleSubmit = {this.handleSubmit}
                              handleEdit = {this.handleEdit}/>
                </div>
            )
        } else {
            return (
                <div className='note'>
                    <h1>#{this.props.number}</h1>
                    {this.props.noteInfo}
                    <span>
                        <button onClick={this.edit} id='edit'>< FaPencilAlt /> Edit</button>
                        <button onClick={this.remove} id='remove'>< FaTrash /> Delete</button>
                    </span>
                </div>
            );
        }
    }

    render() {
        
        return (
            <div>
                {this.showEditForm() }
            </div>
        )
    }
}

export default Note;