import {GET_CITIES} from "./actionTypes";

export const getCitiesFromLocaleStorage = (cities) => ({type: GET_CITIES, payload: cities})

export const citiesState = {
    arrOfCities: [],
};
