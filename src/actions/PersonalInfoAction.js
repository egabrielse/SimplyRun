export const UPDATE_ALL = "UPDATE_ALL"

export const createChangeAllPersonalInfoAction = (name, birthday, height, weight, sex) => {
    return {
        type: UPDATE_ALL,
        name: name,
        birthday: birthday,
        height: height,
        weight: weight,
        sex: sex,
    }
}
