import http from './httpServices';


export const postReview = (data) => {
    return http.post("/reviews", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}

export const getReviewsByUser = (id) => {
    return http.get("/reviews?userId=" + id, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}