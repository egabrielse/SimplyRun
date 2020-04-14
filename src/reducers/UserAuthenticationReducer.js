import {LOGIN_USER, LOGOUT_USER} from '../actions/UserAuthenticationAction'

//Initial state of the store 
const initialState = {
    signedIn:false,
    user:null,
}
//Modfies the store depending on actions 
const UserAuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOGIN_USER:
        //     console.log("UserAuthenticationReducer (",action.type,"): logging in user with uid=", action.user.uid)
        //     return { ...state, signedIn:true, user:action.user }
        // case LOGOUT_USER:
        //     console.log("UserAuthenticationReducer: (",action.type,"): logging out user with uid=", action.user.uid)
        //     return { ...state, signedIn:false, user:null}
        default:
            console.log("UserAuthenticationReducer (",action.type,"): default case (no change to state)")
            return state
    }
}

export default UserAuthenticationReducer;