import {combineReducers} from 'redux'

// 1. Import Reducers here
// import exampleReducer from './exampleReducer'
import UserAuthenticationReducer from './UserAuthenticationReducer'
import SettingsReducer from './SettingsReducer'
import PersonalInfoReducer from './PersonalInfoReducer'


export default combineReducers({
    // 2. Then add them here
    // exampleReducer,
    UserAuthenticationReducer,
    SettingsReducer,
    PersonalInfoReducer,
})