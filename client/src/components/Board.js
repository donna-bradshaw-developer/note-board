import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../redux/auth"
import { addNote, getNotes, updateNote, deleteNote } from "../redux/note"
import { FaPlus } from "react-icons/fa";
import Note from './Note'

class Board extends Component {
    constructor(){
        super()
        this.state = {
            notes: []
        }
    }

    componentDidMount(){
        this.props.getNotes()
    }

    add = (text) => {
        this.props.addNote({noteInfo: text})
    }

    update = (id, updatedText) => {
        this.props.updateNote(id, {noteInfo: updatedText})
    }

    delete = (id) => {
        this.props.deleteNote(id)
    }

    eachNote = (note, i) => {
        return <Note key={i}
                    index={i}
                    number={i + 1}
                    update = {this.update}
                    delete = {this.delete}
                    {...note}/>
    }

    render() {
        return (
            <div className='board'>
                <h1 className="header">My Board</h1>
                <button id="profile"><Link id='profileLink'to="/profile">Profile</Link></button>
                <button id="logout" onClick={this.props.logout}>Logout</button>
                <button id="add" onClick={() => this.add('New Note')}><FaPlus />Add A Note</button>
                <div id='noteContainer'>
                    {this.props.note.notes.map(this.eachNote)}
                </div>
            </div>
        );
    }
}

export default connect(state => state, { logout, addNote, getNotes, updateNote, deleteNote })(Board);