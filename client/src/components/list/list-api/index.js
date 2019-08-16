import axios from 'axios';

// add list
export const addList = (token, list) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/lists`)
    .then(res => res.json())
    .catch(err => console.log(err));
}