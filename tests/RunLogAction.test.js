import {ADD_RUN, DELETE_RUN, addRunAction, deleteRunAction} from '../src/actions/RunLogAction'
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
        route: [{latitude:43.073051,longitude:-89.40123},{latitude:43.073053,longitude:-89.40123}],
        lat:43.073052,
        long:-89.40123,
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
