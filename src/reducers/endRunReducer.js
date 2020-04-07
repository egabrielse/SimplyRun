
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
    secs: 0
    }



//Modfies the store depending on actions 
const endRunReducer = (state = initialState , action) => {
    switch (action.type) {
        case "ENDRUN":
            return (state, {
                time: action.time, distance: action.distance,
                pace: action.pace, calories: action.calories,
                startTime: action.startTime, endTime: action.endTime,
                route: action.route, hours: action.hours, mins: action.mins,
                secs: action.secs
            })
        case"CLEARRUN":
            return state
        default:
            return state
    }
}

export default endRunReducer;