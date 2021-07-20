import axios from "axios";

export const fetchWeather = async (latitude, longitude) => {
  try {
    const params = new URLSearchParams();
    params.append("lat", latitude);
    params.append("lon", longitude);
    params.append("appid", "ad33afc21810adf95292cdc60ea1f573");
    const url =
      "https://api.openweathermap.org/data/2.5/onecall?lat=25.29&lon=112.87&exclude=minutely,hourly,alerts&appid=ad33afc21810adf95292cdc60ea1f573";
    const response = await axios.get(url, { params });
    // Object destructuring (two birds one stone)
    const { current } = response.data;
    // const keys = Object.keys(current);
    // 1. looping 2. keys of object 3. index notation
    // keys.forEach((key) => {
    //   console.log(current[key]);
    // });
    // Dot notation/ index notation ['key' as a string]
    // console.log(current["clouds"]);
    console.log(current);
  } catch (error) {
    console.log("error");
  }
};

export default fetchWeather;
