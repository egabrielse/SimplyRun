
const initialState = {
    time: "",
    distance: "",
    pace: "",
    calories: ""
    }



//Modfies the store depending on actions 
const endRunReducer = (state = initialState , action) => {
    switch (action.type) {
        case "ENDRUN":
            return (state, { time: action.time, distance: action.distance, pace: action.pace, calories: action.calories })
        default:
            return state
    }
}

export default endRunReducer;