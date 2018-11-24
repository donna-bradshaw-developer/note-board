import React from 'react';
import { FaHdd } from "react-icons/fa";

const EditForm = (props) => {
    return (
        <div className='note'>
            <form onSubmit = {props.handleSubmit}>
                <input type='text' name="noteInput" value={props.noteInput} onChange={props.handleEdit}></input>
                <button id="save"><FaHdd /> Save</button>
            </form>
        </div>
    );
}

export default EditForm;
