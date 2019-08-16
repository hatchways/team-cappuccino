import axios from 'axios';

// sign up user
export const signup = user => {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/register`)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}


// sing in user
export const signin = user => {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/login`, user)
        .then(res => res.data)
        .then(data => {
            return data;
        })
        .catch(e => console.log(e));
};


// decode token
export const authenticate = (token, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('token', token)
        next();
    }
}

// set user 
export const setUser = (user, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
        next();
    }
};

// check authentication
export const isAuthenticated = () => {
    if(typeof window === "undefined") return false;

    if (localStorage.getItem("token")) {
        return JSON.parse(localStorage.getItem("token"))
    } else {
        return false;
    }
}

