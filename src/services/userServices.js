import http from './httpServices';


export const getUser = () => {
    return http.get('/users');
}