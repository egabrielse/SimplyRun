import {ADD_RUN, DELETE_RUN, RESET_RUNS, addRunAction, deleteRunAction, resetRunsAction} from '../src/actions/RunLogAction'
import firebase from 'firebase';

describe('addRunAction', () => {
  it('should create an action with type:ADD_RUN when given valid run data.', () => {
    point1 = new firebase.firestore.GeoPoint(43.073051,-89.40123)
    point2 = new firebase.firestore.GeoPoint(43.073053,-89.40123)

    const input = {
        id: "TH9FYXr4NR2rlsbxHa3F",
        note: "well done Jon",
        time: 720,
        distance: 2.1,
        pace: 5.71428571,
        calories: 0,
        start_time: new Date("2020-03-22T12:48:54Z"),
        end_time: new Date("2020-03-22T13:00:54Z"),
        route: [point1,point2],
    }

    const expectedAction = {
        type:ADD_RUN,
        id: "TH9FYXr4NR2rlsbxHa3F",
        note: "well done Jon",
        time: 720,
        distance: 2.1,
        pace: 5.71428571,
        calories: 0,
        start_time: "Sun Mar 22 2020 07:48:54 GMT-0500 (Central Daylight Time)",
        end_time: "Sun Mar 22 2020 08:00:54 GMT-0500 (Central Daylight Time)",
        route: [point1,point2],
        lat:43.073052,
        long:-89.40123,
    }
    expect(addRunAction(input)).toEqual(expectedAction)
  })
})

describe('addRunAction', () => {
  it('should create an action with type:ADD_RUN even if no distance was traveled.', () => {

    const input = {
        id: "TH9FYXr4NR2rlsbxHa3F",
        note: "well done Jon",
        time: 0,
        distance: 0,
        pace: 0,
        calories: 0,
        start_time: new Date("2020-03-22T12:48:54Z"),
        end_time: new Date("2020-03-22T12:48:55Z"),
        route: [],
    }

    const expectedAction = {
        type:ADD_RUN,
        id: "TH9FYXr4NR2rlsbxHa3F",
        note: "well done Jon",
        time: 0,
        distance: 0,
        pace: 0,
        calories: 0,
        start_time: "Sun Mar 22 2020 07:48:54 GMT-0500 (Central Daylight Time)",
        end_time: "Sun Mar 22 2020 07:48:55 GMT-0500 (Central Daylight Time)",
        route: [],
        lat:0,
        long:0,
    }
    expect(addRunAction(input)).toEqual(expectedAction)
  })
})

describe('deleteRunAction', () => {
  it('should create an action with type:DELETE_RUN when given valid run data.', () =>  {
    const input = "TH9FYXr4NR2rlsbxHa3F"

    const expectedAction = {
      type: DELETE_RUN,
      id: "TH9FYXr4NR2rlsbxHa3F",
    }

    expect(deleteRunAction(input)).toEqual(expectedAction)
  })
})

describe('resetRunsAction', () => {
  it('should create an action with type:RESET_RUNS', () =>  {
    const expectedAction = {type: RESET_RUNS}

    expect(resetRunsAction()).toEqual(expectedAction)
  })
})
