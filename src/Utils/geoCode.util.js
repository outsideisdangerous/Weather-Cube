import axios from "axios";
import { InvalidLocationError } from "./errors";

export const fetchGeoCode = async (location) => {
  const params = new URLSearchParams();

  params.append("q", location);
  params.append("appid", "ad33afc21810adf95292cdc60ea1f573");
  params.append("limit", 5);
  const url = "http://api.openweathermap.org/geo/1.0/direct";
  try {
    const response = await axios.get(url, { params });
    if (!response.data.length) {
      throw new InvalidLocationError();
    }
    return response.data;
  } catch (err) {
    if (err instanceof InvalidLocationError) {
      throw new Error(err.message);
    }
    throw new Error("You must enter a location!");
  }
};

export default fetchGeoCode;
