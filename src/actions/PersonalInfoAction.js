export const UPDATE_NAME = "UPDATE_ALL"
export const UPDATE_BIRTH = "UPDATE_ALL"
export const UPDATE_HEIGHT = "UPDATE_ALL"
export const UPDATE_WEIGHT = "UPDATE_ALL"
export const UPDATE_SEX = "UPDATE_ALL"
export const UPDATE_ALL_PERSONAL_INFO = "UPDATE_ALL_PERSONAL_INFO"


export const updateNameAction = (name) => {
    return {
        type: UPDATE_NAME,
        name:name,
    }
}
export const updateBirthdayAction = (birthday) => {
    return {
        type: UPDATE_BIRTH,
        birthday:birthday,
    }
}
export const updateHeightAction = (height) => {
    return {
        type: UPDATE_HEIGHT,
        height:height,
    }
}
export const updateWeightAction = (weight) => {
    return {
        type: UPDATE_WEIGHT,
        weight:weight,
    }
}
export const updateSexAction = (sex) => {
    return {
        type: UPDATE_SEX,
        sex:sex,
    }
}

export const updateAllPersonalInfoAction = (personal) => {
    return {
        type: UPDATE_ALL_PERSONAL_INFO,
        name: personal.name,
        birthday: personal.birthday.seconds,
        height: personal.height,
        weight: personal.weight,
        sex: personal.sex,
    }
}
