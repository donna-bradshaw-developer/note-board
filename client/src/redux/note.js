import axios from 'axios'

const initState = {
    notes:[],
    currentNote: {}
}

let noteAxios = axios.create()

noteAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const getNotes = () => {
    return function(dispatch){
        noteAxios.get("/api/note").then(res =>{
            dispatch({
                type: "GET_NOTES",
                notes: res.data
            })
        }).catch(err =>{
            console.error(err)
        })
    }
}

export const addNote = (newNote) => {
    return function(dispatch){
        noteAxios.post("/api/note/", newNote).then(res=>{
            dispatch({
                type: 'ADD_NOTE',
                currentNote: res.data})
            }).catch(err =>{
                console.error(err)
            })
    }
}

export const updateNote = (id, updatedInfo) => {
    return function(dispatch){
        noteAxios.put(`/api/note/${id}`, updatedInfo).then(res => {
            dispatch({
                type: 'UPDATE_NOTE',
                currentNote: res.data})
            }).catch(err => {
                console.error(err)
            })
    }
}

export const deleteNote = (id) => {
    return function(dispatch){
        noteAxios.delete(`/api/note/${id}`).then(res =>{
            dispatch({
                type: 'DELETE_NOTE',
                currentNote: res.data})
            }).catch(err =>{
                console.error(err)
            })
    }
}

export default function reducer(prevState = initState, action){
    switch(action.type){
        case "GET_NOTES":
            return {
                notes: action.notes,
                currentNote: prevState.currentNote
            }
        case "ADD_NOTE":
            return {
                notes: [...prevState.notes, action.currentNote],
                currentNote: action.currentNote
            }
        case "UPDATE_NOTE":
            return {
                notes: prevState.notes.map(note => (note._id !== action.currentNote._id) ? note : action.currentNote),
                currentNote: action.currentNote
            }
        case "DELETE_NOTE":
            return {
                notes: prevState.notes.filter(note => note._id !== action.currentNote.note._id),
                currentNote: action.currentNote
            }
        case 'LOGOUT':
            return prevState
        default:
            return prevState
    }
}