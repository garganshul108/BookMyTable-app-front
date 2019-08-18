
import http from './httpServices';

export const getLocalitiesByCityName = async (city) => {
    let { data: localities } = await http.get('/localities?city=' + city.toLowerCase());
    return localities.map(locality => locality["locality"]).sort();
}