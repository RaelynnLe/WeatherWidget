const fetchAir = async (lat, lon) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1c5da32bd6a0d1c4c017b21b49833c7f`);
        const data = await response.json();
        let aqi = data.list[0].main.aqi; 
        let nameAqi = '';
        if (aqi === 1) {
            nameAqi = 'Good'
        }
        else if (aqi === 2) {nameAqi = 'Fair'}
        else if (aqi === 3) {nameAqi = 'Moderate'}
        else if (aqi === 4) {nameAqi = 'Poor'}
        else {nameAqi = 'Very Poor'}
        return nameAqi;
    } catch (e) {
        console.error(e);
    }
};

export default fetchAir;