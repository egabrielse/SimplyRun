import {combineReducers} from 'redux'

// 1. Import Reducers here
// import exampleReducer from './exampleReducer'
import UserAuthenticationReducer from './UserAuthenticationReducer'


export default combineReducers({
    // 2. Then add them here
    // exampleReducer,
    UserAuthenticationReducer,
})