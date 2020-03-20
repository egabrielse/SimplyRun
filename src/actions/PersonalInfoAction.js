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
export const updateHeightAction = (m_height, i_height) => {
    return {
        type: UPDATE_HEIGHT,
        m_height:m_height,
        i_height:i_height,
    }
}
export const updateWeightAction = (m_weight, i_height) => {
    return {
        type: UPDATE_WEIGHT,
        m_weight:m_weight,
        i_height:i_height,
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
        m_height: personal.m_height,
        i_height: personal.i_height,
        m_weight: personal.m_weight,
        i_weight: personal.i_weight,
        sex: personal.sex,
    }
}
