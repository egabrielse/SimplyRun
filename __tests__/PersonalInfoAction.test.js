import {UPDATE_NAME,
  UPDATE_BIRTH,
  UPDATE_HEIGHT,
  UPDATE_WEIGHT,
  UPDATE_SEX,
  UPDATE_EMAIL,
  UPDATE_ALL_PERSONAL_INFO} from '../src/actions/PersonalInfoAction'

import {updateAllPersonalInfoAction,
  updateNameAction,
  updateBirthdayAction,
  updateSexAction,
  updateEmailAction,
  updateHeightAction,
  updateWeightAction} from '../src/actions/PersonalInfoAction'

describe('updateAllPersonalInfoAction', () => {
  it('should create an action with type:UPDATE_ALL_PERSONAL_INFO using the passed in user data.', () => {
    const input = {
        name: "Jon Doe",
        email: "jondoe@testme.com",
        birthday: {nanoseconds:0, seconds:504576000},
        height: 76,
        weight: 173,
        sex: "male",
    }

    const expectedAction = {
        type: UPDATE_ALL_PERSONAL_INFO,
        name: "Jon Doe",
        email: "jondoe@testme.com",
        birthday: 504576000,
        height: 76,
        weight: 173,
        sex: "male",
    }
    expect(updateAllPersonalInfoAction(input)).toEqual(expectedAction)
  })
})

describe('updateNameAction', () => {
  it('should create an action with type:UPDATE_NAME using the passed in name.', () => {
    const input = "Jon Doe"
    const expectedAction = {type:UPDATE_NAME,name:"Jon Doe"}
    expect(updateNameAction(input)).toEqual(expectedAction)
  })
})

describe('updateBirthdayAction', () => {
  it('should create an action with type:UPDATE_BIRTH using the passed in name.', () => {
    const input = {nanoseconds:0, seconds:504576000}
    const expectedAction = {type:UPDATE_BIRTH,birthday: {nanoseconds:0, seconds:504576000}}
    expect(updateBirthdayAction(input)).toEqual(expectedAction)
  })
})

describe('updateSexAction', () => {
  it('should create an action with type:UPDATE_SEX using the passed in name.', () => {
    const input = 'male'
    const expectedAction = {type:UPDATE_SEX,sex: 'male'}
    expect(updateSexAction(input)).toEqual(expectedAction)
  })
})

describe('updateEmailAction', () => {
  it('should create an action with type:UPDATE_EMAIL using the passed in name.', () => {
    const input = "jondoe@testme.com"
    const expectedAction = {type:UPDATE_EMAIL,email: "jondoe@testme.com"}
    expect(updateEmailAction(input)).toEqual(expectedAction)
  })
})

describe('updateWeightAction', () => {
  it('should create an action with type:UPDATE_WEIGHT using the passed in name.', () => {
    const input = 173
    const expectedAction = {type:UPDATE_WEIGHT,weight: 173}
    expect(updateWeightAction(input)).toEqual(expectedAction)
  })
})

describe('updateHeightAction', () => {
  it('should create an action with type:UPDATE_HEIGHT using the passed in name.', () => {
    const input = 76
    const expectedAction = {type:UPDATE_HEIGHT,height: 76}
    expect(updateHeightAction(input)).toEqual(expectedAction)
  })
})