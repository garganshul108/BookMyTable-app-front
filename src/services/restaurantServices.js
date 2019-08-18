import http from './httpServices';
// const http = require('axios');
// const apiConfig = require('./config/apiConfig.json');
import { captialize } from '../util/util';

let jsonData = [...require('./dump/JSON/R_data_Gurgaon0+20_filtered.json')];

function renamingProperties(restaurants) {
    const config = require('./config/RestaurantDataConfig.json');
    for (let restaurant of restaurants) {
        for (let oldKey in config) {
            if (restaurant.hasOwnProperty(oldKey)) {
                restaurant[config[oldKey]] = restaurant[oldKey];
                delete restaurant[oldKey];
            }
        }
    }
    return restaurants;
}

function refactorName(name) {
    return captialize(name);
    // return name;
}

function adjustingProperties(restaurants) {
    for (let restaurant of restaurants) {
        if (!Array.isArray(restaurant.cuisines)) {
            restaurant.cuisines = restaurant.cuisines.split(",").map(item => item.trim());
        }
        if (!Array.isArray(restaurant.establishments)) {
            restaurant.establishments = restaurant.establishments.split(",").map(item => item.trim());
        }
        if (!Array.isArray(restaurant.features)) {
            restaurant.features = restaurant.features.split(",").map(item => item.trim());
        }
        restaurant.name = refactorName(restaurant.name);
    }
    return restaurants;
}


export const getRestaurants = () => {
    return jsonData.sort(({ name: nameA }, { name: nameB }) => { if (nameA > nameB) return 1; return -1; });
}


export const getRestaurantsByCity = async (city) => {
    let { data } = await http.get('/restaurants?city=' + city);
    data = renamingProperties(data);
    data = adjustingProperties(data);
    // return data;
    return data.sort(({ name: nameA }, { name: nameB }) => { if (nameA >= nameB) return 1; return -1; });
}

export const getRestaurantById = async (id) => {
    let { data } = await http.get('/restaurants?restaurantId=' + id);
    data = renamingProperties(data);
    data = adjustingProperties(data);
    // console.log("id", id, "iredd", data);
    return data;
}


export const postNewRestaurant = (data) => {
    return http.post('/restaurants', [{ ...data, password: "qwerty", errors: {} }], {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    });
}


