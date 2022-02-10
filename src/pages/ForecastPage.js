import React, {useEffect} from 'react';
import ForecastSwiper from "../components/ForecastSwiper";
import {connect} from "react-redux";
import CurrentForecast from "../components/CurrentForecast";
import NotFoundPage from "../pages/NotFoundPage";

const ForecastPage = (props) => {
    useEffect(() => {
        if (props.error === true) {
            console.log("13123123");
        }
    }, [props.error])

    return (
        <div className='weather-result'>
            {props.error === true ? <NotFoundPage /> :
            (<div>
                <div className='weather'>
                    <CurrentForecast/>
                </div>
            <   ForecastSwiper/>
            </div>)
            }
        </div>
    );
};

const MapStateToProps = (state) => ({
    error: state.weatherData.error,
    location: state.weatherData.responseLocation,
    datetime: state.weatherData.datetime,
    country: state.weatherData.country,
})
export default connect(MapStateToProps)(ForecastPage);