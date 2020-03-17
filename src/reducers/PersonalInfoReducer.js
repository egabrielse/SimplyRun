import {CHANGE_ALL} from '../actions/PersonalInfoAction'

//Initial state of the store 
const initialState = {
    name:null,
    age: null,
    height: null,
    weight:null,
}
//Modfies the store depending on actions 
const PersonalInfoReducer = (state = initialState, action) => {
    console.log("PersonalInfoReducer: action.type =", action.type)
    switch (action.type) {
        case CHANGE_ALL:
            console.log("PersonalInfoReducer: LOGIN_USER")
            return { ...state, name:action.name, age:action.age, height:action.height, weight:action.weight }
        default:
            console.log("PersonalInfoReducer: default case (no change to state)")
            return state
    }
}

export default PersonalInfoReducer;