import {UPDATE_DISP_CAL,
    UPDATE_DISP_DIST,
    UPDATE_DISP_PACE,
    UPDATE_DISP_TIME,
    UPDATE_METRIC,
    UPDATE_UPDATE_FREQ,
    UPDATE_ALL_SETTINGS,} from '../actions/PersonalInfoAction'

//Initial state of the store 
const initialState = {
    display_calories:false,
    display_distance: false,
    display_pace: false,
    display_time:false,
    metric:false,
    update_frequency:0,
}

//Modfies the store depending on actions 
const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DISP_CAL:
            console.log("SettingsReducer (",action.type,"): updating display_calories from",state.display_calories,"to",!state.display_calories)
            return {...state, display_calories: !state.display_calories}

        case UPDATE_DISP_DIST:
            console.log("SettingsReducer (",action.type,"): updating display_distance from",state.display_distance,"to",!state.display_distance)
            return {...state, display_distance: !state.display_distance}

        case UPDATE_DISP_PACE:
            console.log("SettingsReducer (",action.type,"): updating display_pace from",state.display_pace,"to",!state.display_pace)
            return {...state, display_pace: !state.display_pace}

        case UPDATE_DISP_TIME:
            console.log("SettingsReducer (",action.type,"): updating display_time from",state.display_time,"to",!state.display_time)
            return {...state, display_time: !state.display_time}

        case UPDATE_METRIC:
            console.log("SettingsReducer (",action.type,"): updating metric from",state.metric,"to",!state.metric)
            return {...state, metric: !state.metric}

        case UPDATE_UPDATE_FREQ:
            console.log("SettingsReducer (",action.type,"): updating update_frequency from",state.update_frequency,"to",action.update_frequency)
            return {...state, update_frequency: action.update_frequency}

        case UPDATE_ALL_SETTINGS:
            console.log("SettingsReducer ( UPDATE_ALL_SETTINGS ): updating all settings fields")
            return { ...state,
                display_calories: action.display_calories,
                display_distance: action.display_distance,
                display_pace: action.display_pace,
                display_time: action.display_time,
                metric: action.metric,
                update_frequency: action.update_frequency,
            }

        default:
            console.log("SettingsReducer (",action.type,"): default case (no change to state)")
            return state
    }
}

export default SettingsReducer;