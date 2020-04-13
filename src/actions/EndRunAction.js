export const END_RUN = "END_RUN"


export const endRun = (endrun) => {
    return {
        type: END_RUN, time: endrun.time, distance: endrun.distance,
        pace: endrun.pace, calories: endrun.calories, startTime: endrun.startTime, endTime: endrun.endTime,
        route: endrun.route, hours: endrun.hour, mins: endrun.mins, secs: endrun.secs, polyline: endrun.polyline
    }
}
