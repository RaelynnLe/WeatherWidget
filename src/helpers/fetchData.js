const fetchData = async (location) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=1c5da32bd6a0d1c4c017b21b49833c7f`);
        const data = await response.json();
        return data[0];
    } catch (e) {
        console.error(e);
    }
};

export default fetchData;