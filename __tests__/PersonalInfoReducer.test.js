import {UPDATE_ALL_PERSONAL_INFO, UPDATE_NAME, UPDATE_BIRTH, UPDATE_EMAIL, UPDATE_SEX, UPDATE_WEIGHT, UPDATE_HEIGHT} from '../src/actions/PersonalInfoAction'
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

    // TEST 4: CHANGED STATE + UPDATE NAME
    it ('should return state with only the "name" field updated when given a valid UPDATE_NAME action', () => {
        expect(PersonalInfoReducer(changedState, {
            type: UPDATE_NAME,
            name: "Jonathan Dope"
        })).toEqual({
            name: "Jonathan Dope",
            email: "jondoe@testme.com",
            birthday: 504576000,
            height: 76,
            weight: 173,
            sex: "male",
        })
    })
    // TEST 5: CHANGED STATE + UPDATE BIRTH
    it ('should return state with only the "birthday" field updated when given a valid UPDATE_BIRTH action', () => {
        expect(PersonalInfoReducer(changedState, {
            type: UPDATE_BIRTH,
            birthday: 504577678
        })).toEqual({
            name: "Jon Doe",
            email: "jondoe@testme.com",
            birthday: 504577678,
            height: 76,
            weight: 173,
            sex: "male",
        })
    })

    // TEST 6: CHANGED STATE + UPDATE EMAIL
    it ('should return state with only the "email" field updated when given a valid UPDATE_EMAIL action', () => {
        expect(PersonalInfoReducer(changedState, {
            type: UPDATE_EMAIL,
            email: "jonathandope@testmoi.com"
        })).toEqual({
            name: "Jon Doe",
            email: "jonathandope@testmoi.com",
            birthday: 504576000,
            height: 76,
            weight: 173,
            sex: "male",
        })
    })

    // TEST 7: CHANGED STATE + UPDATE SEX
    it ('should return state with only the "sex" field updated when given a valid UPDATE_SEX action', () => {
        expect(PersonalInfoReducer(changedState, {
            type: UPDATE_SEX,
            sex: "female"
        })).toEqual({
            name: "Jon Doe",
            email: "jondoe@testme.com",
            birthday: 504576000,
            height: 76,
            weight: 173,
            sex: "female",
        })
    })

    // TEST 7: CHANGED STATE + UPDATE WEIGHT
    it ('should return state with only the "weight" field updated when given a valid UPDATE_WEIGHT action', () => {
        expect(PersonalInfoReducer(changedState, {
            type: UPDATE_WEIGHT,
            weight: 180
        })).toEqual({
            name: "Jon Doe",
            email: "jondoe@testme.com",
            birthday: 504576000,
            height: 76,
            weight: 180,
            sex: "male",
        })
    })

    // TEST 8: CHANGED STATE + UPDATE HEIGHT
    it ('should return state with only the "height" field updated when given a valid UPDATE_HEIGHT action', () => {
        expect(PersonalInfoReducer(changedState, {
            type: UPDATE_HEIGHT,
            height: 80
        })).toEqual({
            name: "Jon Doe",
            email: "jondoe@testme.com",
            birthday: 504576000,
            height: 80,
            weight: 173,
            sex: "male",
        })
    })
})