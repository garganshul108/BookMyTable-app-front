import http from './httpServices';


export const bookTable = (data) => {
    return http.post("/users/bookings", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}


export const getBookingsByUser = () => {
    return http.get("/users/bookings", {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    });
}