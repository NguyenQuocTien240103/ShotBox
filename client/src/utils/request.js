import axios from 'axios';
// config request
const request = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
})
// export const get = async (path, option = {}) => {
//     const res = await request.get(path, option);
//     return res;
// }
export const post = async (path, value = {}) => {
    const res = await request.post(path, value);
    return res.data;
}
export default request;