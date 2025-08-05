import * as request from '../utils/request'

export const register = async (value) => {
    try {
        const res = await request.post('/auth/register', value);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const login = async (value) => {
    try {
        const res = await request.post('/auth/login', value);
        return res;
    } catch (error) {
        throw error;
    }
}
