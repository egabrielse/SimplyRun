import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import {UPDATE_DISP_CAL,
    UPDATE_DISP_DIST,
    UPDATE_DISP_PACE,
    UPDATE_DISP_TIME,
    UPDATE_METRIC,
    UPDATE_UPDATE_FREQ} from '../actions/PersonalInfoAction'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

//Initial state of the store 
const initialState = {
    display_calories:false,
    display_distance: false,
    display_pace: false,
    display_time:false,
    metric:false,
    update_frequency:0,
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
export const SettingsReducer = (state = initialState, action) => {
    console.log("SettingsReducer: action.type =", action.type)
    switch (action.type) {
        case UPDATE_DISP_CAL:
            console.log("SettingsReducer: updating display_calories from",state.display_calories,"to",!state.display_calories)
            return {...state, display_calories: !state.display_calories}

        case UPDATE_DISP_DIST:
            console.log("SettingsReducer: updating display_distance from",state.display_distance,"to",!state.display_distance)
            return {...state, display_distance: !state.display_distance}

        case UPDATE_DISP_PACE:
            console.log("SettingsReducer: updating display_pace from",state.display_pace,"to",!state.display_pace)
            return {...state, display_pace: !state.display_pace}

        case UPDATE_DISP_TIME:
            console.log("SettingsReducer: updating display_time from",state.display_time,"to",!state.display_time)
            return {...state, display_time: !state.display_time}

        case UPDATE_METRIC:
            console.log("SettingsReducer: updating metric from",state.metric,"to",!state.metric)
            return {...state, metric: !state.metric}

        case UPDATE_UPDATE_FREQ:
            console.log("SettingsReducer: updating update_frequency from",state.update_frequency,"to",action.update_frequency)
            return {...state, update_frequency: action.update_frequency}

        default:
            console.log("SettingsReducer: default case (no change to state)")
            return state
    }
}

export default PersonalInfoReducer;