import {UPDATE_ALL_SETTINGS, RESET_ALL_SETTINGS, updateAllSettingsAction, resetAllSettingsAction} from '../src/actions/SettingsAction'

describe('updateAllSettingsAction', () => {
  it('should create an action with type:UPDATE_ALL_SETTINGS when given valid settings data.', () => {
    const input = {
        display_calories: false,
        display_distance: true,
        display_pace: false,
        display_time: true,
        metric: true,
        update_frequency: true,
    }

    const expectedAction = {
        type: UPDATE_ALL_SETTINGS,
        display_calories: false,
        display_distance: true,
        display_pace: false,
        display_time: true,
        metric: true,
        update_frequency: true,
    }
    expect(updateAllSettingsAction(input)).toEqual(expectedAction)
  })
})


describe('resetAllSettingsAction', () => {

  it('should create an action with type:RESET_ALL_SETTINGS', () => {
    const expectedAction = {type: RESET_ALL_SETTINGS}
    expect(resetAllSettingsAction()).toEqual(expectedAction)
  })
})

