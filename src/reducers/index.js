import {combineReducers} from 'redux'

// 1. Import Reducers here
// import exampleReducer from './exampleReducer'
import emailpassReducer from './emailpassReducer'
import endRunReducer from './endRunReducer'


export default combineReducers({
    // 2. Then add them here
    // exampleReducer,
    emailpassReducer,
    endRunReducer
})