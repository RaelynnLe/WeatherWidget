import React, {useState} from "react";
import {connect} from "react-redux";
import {changeTempScale} from "../store/weatherReducer/weatherReducer";

const TempScaleToggle = (props) => {
    if (!localStorage.getItem('tempScale')) {
        localStorage.setItem('tempScale', 'celsius');
    }
    const [value, setValue] = useState(localStorage.getItem('tempScale'));

    function handleChangeTemp() {
        if (value === 'celsius') {
            setValue('fahrenheit')
            props.changeTempScale('fahrenheit');
            localStorage.setItem('tempScale', 'fahrenheit')
        } else {
            setValue('celsius')
            props.changeTempScale('celsius')
            localStorage.setItem('tempScale', 'celsius')
        }
    }
    return (
        <div className="weather__temp__buttons">
            <button className={value === 'fahrenheit' ? 'active': ''} onClick={()=>handleChangeTemp('fahrenheit')}>F</button>
            <span>/</span>
            <button className={value === 'celsius' ? 'active': ''} onClick={()=>handleChangeTemp('celsius')}>C</button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    tempScale: state.weatherData.tempScale,
});

const mapDispatchToProps = (dispatch) => ({
    changeTempScale: (value) => {
        dispatch(changeTempScale(value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TempScaleToggle);
