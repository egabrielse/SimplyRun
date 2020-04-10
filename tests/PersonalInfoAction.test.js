import {UPDATE_ALL_PERSONAL_INFO, updateAllPersonalInfoAction} from '../src/actions/PersonalInfoAction'

describe('updateAllPersonalInfoAction', () => {
  it('should create an action with type:UPDATE_ALL_PERSONAL_INFO when given valid personal data.', () => {
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