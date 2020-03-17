
const initialState = {
    time: "",

}
//Modfies the store depending on actions 
const endRunReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ENDRUN":
            return { ...state, time: action.time }
        default:
            return state
    }
}

export default endRunReducer;