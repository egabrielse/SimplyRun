export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export const createLoginAction = (email, password) => {
    return {
        type: LOGIN_USER,
        email: email,
        password: password
    }
}

export const createLogoutAction = () => {
    return {
        type: LOGOUT_USER,
        email: "",
        password: ""
    }
}