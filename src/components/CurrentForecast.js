import React from 'react';
import {connect} from 'react-redux';
import moment from "moment";
import WeatherIcon from './WeatherIcon';
import WeatherTempScale from "./WeatherTempScale";
import WeatherCondition from "./WeatherCondition";
import TempScaleToggle from "../components/TempScaleToggle";


const CurrentForecast = (props) => {
    const windToMPS = props.wind;
    if (props.isDay !== 1) {
        var sortedKeys = Object.keys(props.threeDayForecast).sort();
        var first1 = props.threeDayForecast[sortedKeys[props.isDay - 1]];
    }
    return (
        <div>
        {props.isDay === 1 ?
            (
            <div>
                <div className='weather__header'>
                    <h1>{props.location},{props.country}</h1>
                    <div className='flex weather__day'>{moment.unix(props.datetime).format('dddd')} {moment.unix(props.datetime).format("hh A")} <span>•</span><WeatherCondition /></div>
                </div>
                <div className='weather__detail flex'>
                    <div className='flex flex-align-center'>
                        <WeatherIcon icon={props.icon} />
                        <div className='flex flex-align-start'>
                            <WeatherTempScale className='weather__temp-scale'/>
                            <TempScaleToggle/>
                        </div>
                    </div>
                    <div className='weather__properties'>
                        <div className='properties__value'>Humidity: {props.humidity}<span>%</span></div>
                        <div className='properties__value'>Wind:{windToMPS}<span>KPH</span>{props.wind_deg}</div>
                        <div>Air Quality: {props.fetchAir}</div>
                    </div>
                </div>
            </div>) : (
            <div>
                <div className='weather__header'>
                    <h1>{props.location},{props.country}</h1>
                    <div className='flex  weather__day'>{moment.unix(first1.date).format('dddd')} <span>•</span>{first1.description}</div>
                </div>
                <div className='weather__detail flex'>
                    <div className='flex flex-align-center'>
                        <WeatherIcon icon={first1.icon} />
                        <div className='flex flex-align-start'>
                            <h1 className='weather__temp weather__temp--celsius'>

                            {props.tempScale === 'celsius' ? first1.temp_c.toFixed() : first1.temp_f.toFixed()}°
                            </h1>
                            <TempScaleToggle/>
                        </div>
                    </div>
                    <div className='weather__properties'>
                        <div className='properties__value'>Humidity: {first1.humidity}<span>%</span></div>
                        <div className='properties__value'>Wind: {first1.wind}<span>KPH</span></div>
                    </div>
                </div>
            </div>
            ) }
        </div>
    );
};

const mapStateToProps = (state) => ({
    location: state.weatherData.responseLocation,
    datetime: state.weatherData.datetime,
    country: state.weatherData.country,
    responseLocation: state.weatherData.responseLocation,
    threeDayForecast: state.weatherData.threeDayForecast,
    tempScale: state.weatherData.tempScale,
    wind: state.weatherData.wind,
    wind_deg: state.weatherData.wind_deg,
    pressure: state.weatherData.pressure,
    humidity: state.weatherData.humidity,
    code: state.weatherData.code,
    isDay: state.weatherData.isDay,
    icon: state.weatherData.icon,
    fetchAir: state.weatherData.fetchAir,
});

export default connect(mapStateToProps)(CurrentForecast);
