import React, {useCallback, useEffect} from "react";
import {connect} from "react-redux";
import {fetchWeather, setCity} from "../store/weatherReducer/weatherReducer";
import store from "../store/store";
import useDebounce from "../helpers/useDebounce";

const CitySearch = (props) => {
    useEffect(() => {
        if (localStorage.getItem('location') && props.location === '') {
            store.dispatch(setCity(localStorage.getItem('location')));
        }
    }, [])

    useEffect(() => {
            localStorage.setItem('location', props.location);
    }, [props.responseLocation]);

    const debouncedLocation = useDebounce(props.location.trim(), 700);

    const memoLoadWeather = useCallback(fetchWeather(debouncedLocation), [debouncedLocation]);

    useEffect(() => {
        if (debouncedLocation) {
            memoLoadWeather();
        }
    }, [debouncedLocation, memoLoadWeather]);

    return (
        <div className='search'>
            <input
                type='text'
                placeholder="Please fill a city"
                value={props.location}
                onChange={(e) => props.onChange(e)}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    location: state.weatherData.location,
    responseLocation: state.weatherData.responseLocation,
    favoriteCities: state.weatherData.favoriteCities,
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (event) => {
        dispatch(setCity(event.target.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);
