export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export const createLoginAction = (userObject) => {
    return {
        type: LOGIN_USER,
        user: userObject,
    }
}

export const createLogoutAction = (userObject) => {
    return {
        type: LOGOUT_USER,
        user: userObject,
    }
}