import {UPDATE_ALL} from '../actions/PersonalInfoAction'

//Initial state of the store 
const initialState = {
    name:null,
    birthday: null,
    height: null,
    weight:null,
    sex:null,
}
//Modfies the store depending on actions 
const PersonalInfoReducer = (state = initialState, action) => {
    console.log("PersonalInfoReducer: action.type =", action.type)
    switch (action.type) {
        case UPDATE_ALL:
            console.log("PersonalInfoReducer: UPDATE_ALL")
            return { ...state, name:action.name, birthday:action.birthday, height:action.height, weight:action.weight, sex:action.sex}
        default:
            console.log("PersonalInfoReducer: default case (no change to state)")
            return state
    }
}

export default PersonalInfoReducer;