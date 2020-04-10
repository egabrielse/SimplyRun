import {UPDATE_ALL_PERSONAL_INFO} from '../src/actions/PersonalInfoAction'
import PersonalInfoReducer from '../src/reducers/PersonalInfoReducer'


//Initial state of the store 
const initialState = {
    name:null,
    email:null,
    birthday: null,
    height: null,
    weight:null,
    sex:"male",
}

//Initial state of the store 
const changedState = {
    name: "Jon Doe",
    email: "jondoe@testme.com",
    birthday: 504576000,
    height: 76,
    weight: 173,
    sex: "male",
}


describe('PersonalInfoReducer', () => {
    // TEST 1: INITAL STATE
    it('should return the initial state when initialized', () => {
        expect(PersonalInfoReducer(undefined,{})).toEqual(initialState)
    })

    // TEST 2: INITIAL STATE + UPDATE_ALL_PERSONAL_INFO
    it('should return the updated state from inital state when given a valid UPDATE_ALL_PERSONAL_INFO action', () => {    
        expect(PersonalInfoReducer(initialState,{
            type: UPDATE_ALL_PERSONAL_INFO,
            name: "Jon Dope",
            email: "dopest@testme.com",
            birthday: 504577678,
            height: 78,
            weight: 175,
            sex: "male",
        })).toEqual({
            name: "Jon Dope",
            email: "dopest@testme.com",
            birthday: 504577678,
            height: 78,
            weight: 175,
            sex: "male",
        })
    })

    // TEST 3: CHANGED STATE + UPDATE_ALL_PERSONAL_INFO
    it('should return the updated state from changed state when given a valid UPDATE_ALL_PERSONAL_INFO action', () => {    
        expect(PersonalInfoReducer(changedState,{
            type: UPDATE_ALL_PERSONAL_INFO,
            name: "Jon Dope",
            email: "dopest@testme.com",
            birthday: 504577678,
            height: 78,
            weight: 175,
            sex: "male",
        })).toEqual({
            name: "Jon Dope",
            email: "dopest@testme.com",
            birthday: 504577678,
            height: 78,
            weight: 175,
            sex: "male",
        })
    })
})