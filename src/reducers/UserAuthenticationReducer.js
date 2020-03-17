import {LOGIN_USER, LOGOUT_USER} from '../actions/UserAuthenticationAction'

//Initial state of the store 
const initialState = {
    signedIn:false,
    email: "",
    passsword: ""
}
//Modfies the store depending on actions 
const UserAuthenticationReducer = (state = initialState, action) => {
    console.log("UserAuthenticationReducer: action.type =", action.type)
    switch (action.type) {
        case LOGIN_USER:
            console.log("UserAuthenticationReducer: LOGIN_USER")
            return { ...state, signedIn:true, email:action.email, password:action.password }
        case LOGOUT_USER:
            console.log("UserAuthenticationReducer: LOGOUT_USER")
            return { ...state, signedIn:false, email:"", password:""}
        default:
            console.log("UserAuthenticationReducer: default case (no change to state)")
            return state
    }
}

export default UserAuthenticationReducer;