import React from 'react';

const WeatherIcon = ({color, code, isDay, ...props}) => {
    return (
        <img
            className="Weather__icon"
            src={
                "https://openweathermap.org/img/wn/" +
                props.icon +
                ".png"
            }
            alt="weather-icon"
            />
    )

}

export default WeatherIcon;