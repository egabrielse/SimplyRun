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
export const updateHeightAction = (met_height, imp_height) => {
    return {
        type: UPDATE_HEIGHT,
        met_height:met_height,
        imp_height:imp_height,
    }
}
export const updateWeightAction = (met_weight, imp_height) => {
    return {
        type: UPDATE_WEIGHT,
        met_weight:met_weight,
        imp_height:imp_height,
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
        met_height: personal.met_height,
        imp_height: personal.imp_height,
        met_weight: personal.met_weight,
        imp_weight: personal.imp_weight,
        weight: personal.weight,
        sex: personal.sex,
    }
}
