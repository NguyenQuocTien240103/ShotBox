import axios from 'axios';
// config request
const request = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/',
})

export const get = async (path,options = {})=>{
        const response = await request.get(path,options);
        return response;
}

export default request;