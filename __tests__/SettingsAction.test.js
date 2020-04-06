import {UPDATE_ALL_SETTINGS, updateAllSettingsAction} from '../src/actions/SettingsAction'

describe('updateAllSettingsAction', () => {
  it('should create an action with type:UPDATE_ALL_SETTINGS when given valid settings data.', () => {
    const input = {
        display_calories: false,
        display_distance: true,
        display_pace: false,
        display_time: true,
        metric: true,
        update_frequency: 5,
    }

    const expectedAction = {
        type: UPDATE_ALL_SETTINGS,
        display_calories: false,
        display_distance: true,
        display_pace: false,
        display_time: true,
        metric: true,
        update_frequency: 5,
    }
    expect(updateAllSettingsAction(input)).toEqual(expectedAction)
  })
})

