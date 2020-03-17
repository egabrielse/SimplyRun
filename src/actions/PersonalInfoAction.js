export const CHANGE_ALL = "CHANGE_ALL"

export const createChangeAllPersonalInfoAction = (name, age, height, weight) => {
    return {
        type: CHANGE_ALL,
        name: name,
        age: age,
        height: height,
        weight: weight,
    }
}
