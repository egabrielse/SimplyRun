import {UPDATE_ALL_SETTINGS} from '../src/actions/SettingsAction'
import SettingsReducer from '../src/reducers/SettingsReducer'


//Initial state of the store 
const initialState = {
    display_calories:false,
    display_distance: false,
    display_pace: false,
    display_time:false,
    metric:false,
    update_frequency:false,
}

//Initial state of the store 
const changedState = {
    display_calories:true,
    display_distance: true,
    display_pace: false,
    display_time:false,
    metric:true,
    update_frequency:true,
}


describe('SettingsReducer', () => {
    // TEST 1: INITAL STATE
    it('should return the initial state when initialized', () => {
        expect(SettingsReducer(undefined,{})).toEqual(initialState)
    })

    // TEST 2: INITIAL STATE + UPDATE_ALL_SETTINGS
    it('should return the updated state from inital state when given a valid UPDATE_ALL_SETTINGS action', () => {    
        expect(SettingsReducer(initialState,{
            type: UPDATE_ALL_SETTINGS,
            display_calories: true,
            display_distance: true,
            display_pace: true,
            display_time: true,
            metric: true,
            update_frequency: true,
        })).toEqual({
            display_calories: true,
            display_distance: true,
            display_pace: true,
            display_time: true,
            metric: true,
            update_frequency: true,
        })
    })
})