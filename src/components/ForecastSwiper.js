import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import WeatherIcon from "./WeatherIcon";
import store from '../store/store'
import { setDay } from "../store/weatherReducer/weatherReducer";


const ForecastSwiper = (props) => {
    function handleChangeDay(indexDay) {
        store.dispatch(setDay(indexDay));
    }
        return (
            <div className="flex flex-8 weather__week">
                {props.threeDayForecast.map((day) =>
                    <div className={`flex__item weather__item ${props.isDay === day.isDay ? 'active': ''}`} key={day.date} onClick={() => handleChangeDay(day.isDay)}>
                        <h3 className='item__date'>
                            {moment.unix(day.date).format('ddd')}
                        </h3>
                        <WeatherIcon className='item__icon' icon={day.icon} isDay={day.isDay} />
                        <div className='item__temp'>
                            <p className="item__temp--max">{props.tempScale === 'celsius' ? day.temp_c.toFixed() : day.temp_f.toFixed()}°</p>  
                            <p>{props.tempScale === 'celsius' ? day.temp_min_c.toFixed() : day.temp_min_f.toFixed()}°</p>
                        </div>
                    </div>
                )}
            </div>
        )
}

const mapStateToProps = (state) => ({
    isDay: state.weatherData.isDay,
    threeDayForecast: state.weatherData.threeDayForecast,
    hourlyForecast: state.weatherData.hourlyForecast,
    tempScale: state.weatherData.tempScale,
})

export default connect(mapStateToProps)(ForecastSwiper);