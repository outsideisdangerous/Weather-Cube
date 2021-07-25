import axios from "axios";

export const fetchGeoCode = async (location) => {
  const params = new URLSearchParams();
  if (location === "") {
    throw new Error("Empty location is not valid.");
  }
  params.append("q", location);
  params.append("appid", "ad33afc21810adf95292cdc60ea1f573");
  params.append("limit", 5);
  const url = "http://api.openweathermap.org/geo/1.0/direct";
  const response = await axios.get(url, { params });
  return response.data;
};

export default fetchGeoCode;
