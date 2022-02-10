import React from 'react';
import {connect} from "react-redux";

const WeatherTempScale = (props) => {
    if (props.tempScale === 'celsius') {
        return (
            <h1 className='weather__temp weather__temp--celsius'>
                {props.temp_c}°
            </h1>
        )
    } else {
        return (
            <h1 className='weather__temp weather__temp--celsius'>
                {props.temp_f}°
            </h1>
        )
    }
};

const mapStateToProps = (state) => ({
    tempScale: state.weatherData.tempScale,
    temp_c: state.weatherData.temp_c,
    temp_f: state.weatherData.temp_f
})

export default connect(mapStateToProps)(WeatherTempScale);