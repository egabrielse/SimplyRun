export const UPDATE_DISP_CAL = "UPDATE_DISP_CAL"
export const UPDATE_DISP_DIST = "UPDATE_DISP_DIST"
export const UPDATE_DISP_PACE = "UPDATE_DISP_PACE"
export const UPDATE_DISP_TIME = "UPDATE_DISP_TIME"
export const UPDATE_METRIC = "UPDATE_METRIC"
export const UPDATE_UPDATE_FREQ = "UPDATE_UPDATE_FREQ"

export const updateDisplayCaloriesAction = () => {
    return {
        type: UPDATE_DISP_CAL,
    }
}
export const updateDisplayDistanceAction = () => {
    return {
        type: UPDATE_DISP_DIST,
    }
}
export const updateDisplayPaceAction = () => {
    return {
        type: UPDATE_DISP_PACE,
    }
}
export const updateDisplayTimeAction = () => {
    return {
        type: UPDATE_DISP_TIME,
    }
}
export const updateMetricAction = () => {
    return {
        type: UPDATE_METRIC,
    }
}
export const updateFrequencyAction = (update_frequency) => {
    return {
        type: UPDATE_UPDATE_FREQ,
        update_frequency:update_frequency,
    }
}
