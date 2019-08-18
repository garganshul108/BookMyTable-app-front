import http from './httpServices';

export const fileUpload = (data, dir) => {
    // console.log(data);
    return http.post('/photos?dir=' + dir, data, {
        headers: {
            'content-type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
        }
    });
}

export const getPhotoURL = (name, dir) => {
    return process.env.REACT_APP_API_URL + "/photos/" + name + "?dir=" + dir;
}