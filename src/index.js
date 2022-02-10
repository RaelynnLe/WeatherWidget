import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store/store'
import App from './App';
import './index.css';
import {getCitiesFromLocaleStorage} from "./store/favoriteCitiesReducer/favoriteCitiesReducer";
import {BrowserRouter} from "react-router-dom";
import { changeTempScale , setError } from "./store/weatherReducer/weatherReducer";

if (!localStorage.getItem('cities')) {
    localStorage.setItem('cities', '[]');
} else {
    const citiesStr = localStorage.getItem('cities')
    const cities = JSON.parse(citiesStr);
    if (cities.length === 0) {
        store.dispatch(setError(true));
    } else {
        store.dispatch(getCitiesFromLocaleStorage(cities));
    }
}

if (localStorage.getItem('tempScale')) {
    store.dispatch(changeTempScale(localStorage.getItem('tempScale')))
}


const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter basename='/SimpleWeather'>
                <App/>
            </BrowserRouter>
    </Provider>,
    rootElement
)
