// import { getRestaurants } from './restaurantServices';
import http from './httpServices';
// const http = require('axios');
// const apiConfig = require('./config/apiConfig.json');


export const getCuisinesByCity = async (city) => {
    const { data } = await http.get('/restaurants?city=' + city + "&meta=cuisines");
    let cuisines = [];
    for (let key in data) {
        cuisines.push({ "name": key, "count": data[key] });
    }
    return cuisines.sort(({ count: countA }, { count: countB }) => countB - countA);
}

export const getNamesOfAllCuisines = async () => {
    const { data: cuisines } = await http.get("/cuisines");
    return cuisines.sort();
}