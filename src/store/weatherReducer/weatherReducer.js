import store from "../store";
import {
    CHANGE_TEMP_SCALE,
    SET_CITY,
    SET_AIR,
    SET_DAY,
    SET_WEATHER,
    SET_ERROR
} from "./actionTypes";
import fetchData from "../../helpers/fetchData";
import fetchLocation from "../../helpers/fetchLocation";
import fetchAir from "../../helpers/fetchAir";

export const setError = (error) => ({type: SET_ERROR,  payload: error})
export const setCity = (city) => ({type: SET_CITY, payload: city})
export const setWeather = (response) => ({type: SET_WEATHER, payload: response})
export const setAir = (response) => ({type: SET_AIR, payload: response})
export const setDay = (response) => ({type: SET_DAY, payload: response})
export const changeTempScale = (response) => ({type: CHANGE_TEMP_SCALE, payload: response})

export const initialState = {
    location: '',
    responseLocation: '',
    country: '',
    temp_c: '',
    temp_f: '',
    condition: '',
    wind: '',
    wind_deg: '',
    pressure: '',
    humidity: '',
    icon: '',
    code: '',
    isDay: 1,
    tempScale: 'celsius',
    hourlyForecast: [],
    threeDayForecast: [],
    forecastMod: 'threeDay',
    datetime: '',
    error: true
};

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CITY:
            return {...state, location: action.payload.toLowerCase()};
        case SET_WEATHER:
            return {
                ...state,
                responseLocation: action.payload.data.name,
                country: action.payload.data.country,
                temp_f: (((action.payload.data2.current.temp - 273.15)*1.8) + 32).toFixed(),
                temp_c: (action.payload.data2.current.temp - 273.15).toFixed(),
                condition: action.payload.data2.current.weather[0].description.toLowerCase(),
                wind: (action.payload.data2.current.wind_speed * 3.6),
                wind_deg: action.payload.data2.current.wind_deg,
                humidity: action.payload.data2.current.humidity,
                icon: action.payload.data2.current.weather[0].icon,
                isDay: 1,
                error: false,
                threeDayForecast: action.payload.data2.daily.map((day, index) => {
                    return {
                        date: day.dt,
                        temp_f: (((day.temp.max - 273.15)*1.8) + 32),
                        temp_c: (day.temp.max - 273.15),
                        temp_min_f: (((day.temp.min - 273.15)*1.8) + 32),
                        temp_min_c: (day.temp.min - 273.15),
                        humidity: day.humidity,
                        wind:day.wind_speed,
                        wind_deg: day.wind_deg,
                        icon: day.weather[0].icon,
                        description: day.weather[0].description,
                        isDay: index + 1,
                    }
                }),
                datetime: action.payload.data2.current.dt
            };
        case SET_AIR:
            return {
                ...state,
                fetchAir: action.payload
            }
        case SET_DAY: 
            return {
                ...state,
                isDay:action.payload
            }
        case CHANGE_TEMP_SCALE:
            return {
                ...state,
                tempScale: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export const fetchWeather = (debouncedLocation, state = initialState) => async () => {
    try {
        const data = await (fetchData(debouncedLocation));
        if (data !== undefined) {
            const data2 = await (fetchLocation(data.lat, data.lon));
            const dataAir = await (fetchAir(data.lat, data.lon));
            store.dispatch(setWeather({data2, data}));
            store.dispatch(setAir(dataAir));
        } else {
            return {
                ...state,
                error: true
            }
        }

    } catch (e) {
        console.error(e);
    }
}