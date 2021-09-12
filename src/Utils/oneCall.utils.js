import axios from "axios";

export const fetchWeather = async (cat, dog) => {
  try {
    const params = new URLSearchParams();
    params.append("lat", cat);
    params.append("lon", dog);
    params.append("appid", "ad33afc21810adf95292cdc60ea1f573");
    const url =
      "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts";
    const response = await axios.get(url, { params });
    const { daily } = response.data;

    return daily;
  } catch (error) {
    console.log("error");
  }
};

export default fetchWeather;
