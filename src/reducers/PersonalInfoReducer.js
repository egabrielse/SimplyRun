import {UPDATE_NAME,
    UPDATE_BIRTH,
    UPDATE_HEIGHT,
    UPDATE_WEIGHT,
    UPDATE_SEX,
    UPDATE_ALL_PERSONAL_INFO} from '../actions/PersonalInfoAction'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

//Initial state of the store 
const initialState = {
    name:null,
    birthday: null,
    height: null,
    weight:null,
    sex:"male",
}

/**
 * TODO
 * 1) Need to update each reducer so that a change is pushed to the firestore DB,
 * (If successful, state is also update, otherwise, state remains the same)
 * 
 * 2) Need to create a fetch data action that fetches the personal info data from the firestore DB
 * (If successful, state is updated with the data in the firestore, otherwise state remains the same)
 */

//Modfies the store depending on actions 
export const PersonalInfoReducer = (state = initialState, action) => {
    console.log("PersonalInfoReducer: action.type =", action.type)
    switch (action.type) {
        case UPDATE_NAME:
            console.log("PersonalInfoReducer: name from",state.name,"to",action.name)
            return {...state, name: action.name}

        case UPDATE_BIRTH:
            console.log("PersonalInfoReducer: birthday from",state.birthday,"to",action.birthday)
            return {...state, birthday: action.birthday}

        case UPDATE_HEIGHT:
            console.log("PersonalInfoReducer: height from",state.height,"to",action.height)
            return {...state, height: action.height}
            
        case UPDATE_WEIGHT:
            console.log("PersonalInfoReducer: weight from",state.weight,"to",action.weight)
            return {...state, weight: action.weight}

        case UPDATE_SEX:
            console.log("PersonalInfoReducer: sex from",state.sex,"to",action.sex)
            return {...state, sex: action.sex}

        case UPDATE_ALL_PERSONAL_INFO:
            console.log("PersonalInfoReducer: UPDATE_ALL_PERSONAL_INFO")
            return { ...state,
                name:action.name,
                birthday:action.birthday,
                height:action.height,
                weight:action.weight,
                sex:action.sex}

        default:
            console.log("PersonalInfoReducer: default case (no change to state)")
            return state
    }
}

export default PersonalInfoReducer;