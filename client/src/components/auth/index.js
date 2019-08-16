import axios from 'axios';



// sign up user
export const signup = user => {
    return axios.post(`${process.env.REACT_APP_API_URL}/user/register`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}


// sing in user
export const signin = user => {
    return axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            
            return res.data;
        })
        .catch(e => console.log(e));
};


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
        return localStorage.getItem("token")
    } else {
        return false;
    }
}

