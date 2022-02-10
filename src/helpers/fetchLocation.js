const fetchLocation = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=1c5da32bd6a0d1c4c017b21b49833c7f`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};

export default fetchLocation;