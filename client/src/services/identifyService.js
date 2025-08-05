import * as request from '../utils/request';

export const requestCodeByEmail = async (value) => {
    try {
        const res = await request.post('/auth/identify', value);
        return res;
    } catch (error) {
        throw error;
    }
}

export const vertifyCode = async (idCode) => {
    try {
        const res = await request.get(`/identify/${idCode}`);
        return res;
    } catch (error) {
        throw error;
    }
}

export const updatePasswordAfterVerify = async (value) => {
    try {
        const res = await request.put(`/identify`, value);
        return res;
    } catch (error) {
        throw error;
    }
}