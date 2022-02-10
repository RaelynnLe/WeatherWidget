import React from "react";
import CitySearch from "../components/CitySearch";
import {connect} from "react-redux";


const SearchPage = (props) => {
        return (
            <CitySearch/>
        );
};

const mapStateToProps = (state) => ({
    location: state.weatherData.location,
    responseLocation: state.weatherData.responseLocation,
})

export default connect(mapStateToProps)(SearchPage);
