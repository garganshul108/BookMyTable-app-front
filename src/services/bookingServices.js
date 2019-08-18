import http from './httpServices';


export const bookTable = (data) => {
    return http.post("/users/bookings", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}