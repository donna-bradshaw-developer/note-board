import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import note from "./note"
import auth from "./auth"

const reducer = combineReducers({
    note,
    auth
})

export default createStore(reducer, applyMiddleware(thunk))