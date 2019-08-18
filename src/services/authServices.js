import http from './httpServices';

const login = (data) => {
    return http.post("/login", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}

const registerUser = (data) => {
    return http.post("/users", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}

export default {
    registerUser: registerUser,
    login: login
}