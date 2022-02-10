import React from 'react';
import {connect} from 'react-redux';

const WeatherCondition = (props) => {
    return (
        <div className='condition'> {props.condition}</div>
    )
}

const mapStateToProps = (state) => ({
    condition: state.weatherData.condition,
})

export default connect(mapStateToProps)(WeatherCondition);

