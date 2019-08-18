import http from './httpServices';

export const postBookmark = (data) => {
    return http.post("/bookmarks", [{ ...data }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}