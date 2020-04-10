import {ADD_RUN, DELETE_RUN} from '../src/actions/RunLogAction'
import RunLogReducer from '../src/reducers/RunLogReducer'
import firebase from 'firebase';


const initialState = {
    runs:[],
    total_time:0,
    total_distance:0,
    total_calories:0,
    // average_pace: ,
}

const nonEmptyState = {
    runs:[{id: "A0mIWhNc74WVyIaeQxXg", time: 720, distance: 2.1, pace: 5.71428571, calories: 475},
    {id: "X7dIhDstHGkoWLqyAjcv", time: 2420, distance: 4.9, pace: 8.23129252, calories: 750},
    {id: "2FMpFLsVueJHv24wOxky", time: 600, distance: 1.1, pace: 9.09090909, calories: 530},
    {id: "vlJaCMoqZl9Xl80xS6OX", time: 790, distance: 1.8, pace: 7.314814181, calories: 270}],
    total_time: 4530,
    total_distance: 9.9,
    total_calories: 2025,
    // average_pace:,
}


describe('RunLogReducer', () => {
    // TEST 1: INITAL STATE
    it('should return the initial state when initialized', () => {
        expect(RunLogReducer(undefined,{})).toEqual(initialState)
    })


    // TEST 2: INITIAL STATE + ADD_RUN
    it('should add a new run entry to the runs store when given a valid ADD_RUN action', () => {
        expect(RunLogReducer(initialState, {
            type:ADD_RUN,
            id: "TH9FYXr4NR2rlsbxHa3F",
            note: "well done Jon",
            time: 960,
            distance: 2.3,
            pace: 6.95652174,
            calories: 480,
            start_time: "Sun Mar 22 2020 07:48:54 GMT-0500 (Central Daylight Time)",
            end_time: "Sun Mar 22 2020 08:00:54 GMT-0500 (Central Daylight Time)",
            route: [{latitude:43.073051,longitude:-89.40123},{latitude:43.073053,longitude:-89.40123}],
            lat:43.073052,
            long:-89.40123,
        })).toEqual({
            runs: [{
                id: "TH9FYXr4NR2rlsbxHa3F",
                note: "well done Jon",
                time: 960,
                distance: 2.3,
                pace: 6.95652174,
                calories: 480,
                start_time: "Sun Mar 22 2020 07:48:54 GMT-0500 (Central Daylight Time)",
                end_time: "Sun Mar 22 2020 08:00:54 GMT-0500 (Central Daylight Time)",
                route: [{latitude:43.073051,longitude:-89.40123},{latitude:43.073053,longitude:-89.40123}],
                lat:43.073052,
                long:-89.40123,
            }],
            total_time: 960,
            total_distance: 2.3,
            total_calories: 480,
            // average_pace: ,
        })
    })

    // TEST 3: NON EMPTY STATE + ADD_RUN
    it('should add a new run entry to the runs store when given a valid ADD_RUN action', () => {
        expect(RunLogReducer(nonEmptyState, {
            type:ADD_RUN,
            id: "TH9FYXr4NR2rlsbxHa3F",
            note: "well done Jon",
            time: 960,
            distance: 2.3,
            pace: 6.95652174,
            calories: 480,
            start_time: "Sun Mar 22 2020 07:48:54 GMT-0500 (Central Daylight Time)",
            end_time: "Sun Mar 22 2020 08:00:54 GMT-0500 (Central Daylight Time)",
            route: [{latitude:43.073051,longitude:-89.40123},{latitude:43.073053,longitude:-89.40123}],
            lat:43.073052,
            long:-89.40123,
        })).toEqual({
            runs: [
            {id: "A0mIWhNc74WVyIaeQxXg", time: 720, distance: 2.1, pace: 5.71428571, calories: 475},
            {id: "X7dIhDstHGkoWLqyAjcv", time: 2420, distance: 4.9, pace: 8.23129252, calories: 750},
            {id: "2FMpFLsVueJHv24wOxky", time: 600, distance: 1.1, pace: 9.09090909, calories: 530},
            {id: "vlJaCMoqZl9Xl80xS6OX", time: 790, distance: 1.8, pace: 7.314814181, calories: 270},
            {   id: "TH9FYXr4NR2rlsbxHa3F",
                note: "well done Jon",
                time: 960,
                distance: 2.3,
                pace: 6.95652174,
                calories: 480,
                start_time: "Sun Mar 22 2020 07:48:54 GMT-0500 (Central Daylight Time)",
                end_time: "Sun Mar 22 2020 08:00:54 GMT-0500 (Central Daylight Time)",
                route: [{latitude:43.073051,longitude:-89.40123},{latitude:43.073053,longitude:-89.40123}],
                lat:43.073052,
                long:-89.40123,
            }],
            total_time: 4530 + 960,
            total_distance: 9.9 + 2.3,
            total_calories: 2025 + 480,
            // average_pace: ,
        })
    })

    // TEST 4: NON EMPTY STATE + DELETE_RUN
    it('should add a delete the run entry from the run store when given a valid DELETE_RUN action', () => {
        expect(RunLogReducer(nonEmptyState, {type:DELETE_RUN, id: "X7dIhDstHGkoWLqyAjcv",
        })).toEqual({
            runs: [{id: "A0mIWhNc74WVyIaeQxXg", time: 720, distance: 2.1, pace: 5.71428571, calories: 475},
            {id: "2FMpFLsVueJHv24wOxky", time: 600, distance: 1.1, pace: 9.09090909, calories: 530},
            {id: "vlJaCMoqZl9Xl80xS6OX", time: 790, distance: 1.8, pace: 7.314814181, calories: 270}],
            total_time: 4530 - 2420,
            total_distance: 9.9 - 4.9,
            total_calories: 2025 - 750,
            // average_pace: ,
            
        })
    })
})