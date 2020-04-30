import endRunReducer from '../src/reducers/endRunReducer'
import { END_RUN } from '../src/actions/EndRunAction'
const initialState = {
    time: 0,
    distance: 0,
    pace: 0,
    calories: 0,
    startTime: "",
    endTime: "",
    route: [],
    hours: 0,
    mins: 0,
    secs: 0,
    polyline: []
}

let date = new Date();

const changedState = {
    time: 1,
    distance: 1,
    pace: 1,
    calories: 1,
    startTime: date,
    endTime: date,
    route: [1],
    hours: 1,
    mins: 1,
    secs: 1,
    polyline: [1]
}


describe('EndRunReducer', () => {
    // TEST 1: INITAL STATE
    it('should return the initial state when initialized', () => {
        expect(endRunReducer(undefined, {})).toEqual(initialState)
    })
    // TEST 2: INITIAL STATE + UPDATE_ALL_PERSONAL_INFO
    it('should return the updated state from inital state', () => {
        expect(endRunReducer(initialState, {
            type: END_RUN,
            time: 1,
            distance: 1,
            pace: 1,
            calories: 1,
            startTime: date,
            endTime: date,
            route: [1],
            hours: 1,
            mins: 1,
            secs: 1,
            polyline: [1]
        })).toEqual({
            time: 1,
            distance: 1,
            pace: 1,
            calories: 1,
            startTime: date,
            endTime: date,
            route: [1],
            hours: 1,
            mins: 1,
            secs: 1,
            polyline: [1]
        })
    })

    // TEST 3: CLEARRUN
    it('should return the updated state from inital state', () => {
        expect(endRunReducer(initialState, {
            type: "CLEARRUN",
        })).toEqual(initialState)
    })
})