import {UPDATE_NAME,
    UPDATE_BIRTH,
    UPDATE_HEIGHT,
    UPDATE_WEIGHT,
    UPDATE_SEX,
    UPDATE_ALL_PERSONAL_INFO} from '../actions/PersonalInfoAction'

//Initial state of the store 
const initialState = {
    name:null,
    birthday: null,
    met_height: null,
    imp_height: null,
    met_weight:null,
    imp_height:null,
    sex:"male",
}

//Modfies the store depending on actions 
const PersonalInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NAME:
            console.log("PersonalInfoReducer (",action.type,"): updating name from",state.name,"to",action.name)
            return {...state, name: action.name}

        case UPDATE_BIRTH:
            console.log("PersonalInfoReducer (",action.type,"): updating birthday from",state.birthday,"to",action.birthday)
            return {...state, birthday: action.birthday}

        case UPDATE_HEIGHT:
            console.log("PersonalInfoReducer (",action.type,"): updating met_height from",state.met_height,"to",action.met_height)
            return {...state, met_height: action.met_height, imp_height: action.imp_height}
            
        case UPDATE_WEIGHT:
            console.log("PersonalInfoReducer (",action.type,"): updating met_weight from",state.met_weight,"to",action.met_weight)
            return {...state, met_weight: action.met_weight, imp_height: action.imp_height}

        case UPDATE_SEX:
            console.log("PersonalInfoReducer (",action.type,"): updating sex from",state.sex,"to",action.sex)
            return {...state, sex: action.sex}

        case UPDATE_ALL_PERSONAL_INFO:
            console.log("PersonalInfoReducer ( UPDATE_ALL_PERSONAL_INFO ) updating all personal info fields")
            return { ...state,
                name: action.name,
                birthday: action.birthday,
                met_height: action.met_height,
                imp_height: action.imp_height,
                met_weight: action.met_weight,
                imp_height: action.imp_height,
                weight: action.weight,
                sex: action.sex}

        default:
            console.log("PersonalInfoReducer (",action.type,"): default case (no change to state)")
            return state
    }
}

export default PersonalInfoReducer;