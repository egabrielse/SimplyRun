import {UPDATE_NAME,
    UPDATE_BIRTH,
    UPDATE_HEIGHT,
    UPDATE_WEIGHT,
    UPDATE_SEX,
    UPDATE_ALL_PERSONAL_INFO} from '../actions/PersonalInfoAction'

//Initial state of the store 
const initialState = {
    name:null,
    email:null,
    birthday: null,
    m_height: null,
    i_height: null,
    m_weight:null,
    i_weight:null,
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
            console.log("PersonalInfoReducer (",action.type,"): updating m_height from",state.m_height,"to",action.m_height)
            return {...state, m_height: action.m_height, i_height: action.i_height}
            
        case UPDATE_WEIGHT:
            console.log("PersonalInfoReducer (",action.type,"): updating m_weight from",state.m_weight,"to",action.m_weight)
            return {...state, m_weight: action.m_weight, i_weight: action.i_weight}

        case UPDATE_SEX:
            console.log("PersonalInfoReducer (",action.type,"): updating sex from",state.sex,"to",action.sex)
            return {...state, sex: action.sex}

        case UPDATE_ALL_PERSONAL_INFO:
            console.log("PersonalInfoReducer ( UPDATE_ALL_PERSONAL_INFO ) updating all personal info fields")
            return { ...state,
                name: action.name,
                email: action.email,
                birthday: action.birthday,
                m_height: action.m_height,
                i_height: action.i_height,
                m_weight: action.m_weight,
                i_weight: action.i_weight,
                sex: action.sex}

        default:
            console.log("PersonalInfoReducer (",action.type,"): default case (no change to state)")
            return state
    }
}

export default PersonalInfoReducer;