import axios from 'axios'

const profileAxios = axios.create()
profileAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const initState = {
    user:{},
    authError:{
        signup: "",
        login: ""
    },
    isAuthenticated: false
}

export function authenticate(user){
    return {
        type: "AUTHENTICATE",
        user 
    }
}

export function authError(key, errCode){
    return{
        type: "AUTH_ERROR",
        key,
        errCode
    }
}

export const verify = () =>{
    return dispatch => {
        profileAxios.get("/api/profile").then(res => {
            let { user } = res.data
            dispatch(authenticate(user))
        })
    }
}

export const signup = (userInfo) => {
    return dispatch => {
        axios.post('/auth/register', userInfo).then(res => {
            const {token, user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch(authenticate(user))
        }).catch(err => {
            console.error(err)
            dispatch(authError("signup", err.response.data.err))
        })
    }
}

export const login = (credentials) => {
    return dispatch => {
        axios.post('/auth/login', credentials).then(res => {
            const { token, user } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch(authenticate(user))
        }).catch(err => {
            console.error(err)
            dispatch(authError("login", err.response.data.err))
        })
    }
}

export const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return{
        type: "LOGOUT"
    }
}

export default function reducer(prevState = initState, action){
    switch(action.type){
        case "AUTHENTICATE":
            return {
                ...prevState,
                user: action.user,
                authError: prevState.authError,
                isAuthenticated: true
            }
        case "AUTH_ERROR":
            return{
                ...prevState,
                authError: {
                    ...prevState.authError,
                    [action.key]: action.errCode
                }
            }
        case "LOGOUT":
            return { 
                user:{},
                authError:{
                    signup: "",
                    login: ""
                },
                isAuthenticated: false 
            }
        default:
            return prevState
    }
}