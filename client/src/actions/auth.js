
export const authLogin = () =>{
    return {
        type: 'LOGIN_SUCCESS',
        payload: true,
    }
}

export const authLogout = () =>{
    return {
        type: 'LOGOUT',
        payload: false,
    }
}