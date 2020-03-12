//Initial state of the store 
const initialState = {
    email: "",
    passsword: ""
}
//Modfies the store depending on actions 
const emailpassReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EMAIL":
            return { ...state, email: action.email }
        case "PASSWORD":
            return { ...state, password: action.password }
        default:
            return state
    }
}

export default emailpassReducer;