import http from './httpServices';

export const postBeenThere = (data) => {
    return http.post("/beentheres", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}