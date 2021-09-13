import React, { useState } from "react";
import fetchGeoCode from "../Utils/geoCode.util";
import fetchWeather from "../Utils/oneCall.utils";
import moment from "moment";

function LandPage({ location, setLocation }) {
  const [geoCodes, setGeoCodes] = useState([]);
  const [sevenDays, setSevenDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setLocation(event.target.value);
    setGeoCodes([]);
    setSevenDays([]);
  };

  const handleBtn = async (event) => {
    try {
      setError(null);
      setLoading(true);
      const geoResults = await fetchGeoCode(location);
      setGeoCodes(geoResults);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeoLocation = async (geoCode) => {
    try {
      setLoading(true);
      const { lat, lon } = geoCode;
      const sevenDay = await fetchWeather(lat, lon);
      setSevenDays(sevenDay);
      setLoading(false);
      setGeoCodes([geoCode]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <input
          className="p-2 h-10 shadow-md rounded-lg "
          type="text"
          name="location"
          placeholder="Enter location here"
          onChange={handleChange}
        />
        <button
          onClick={handleBtn}
          className="ml-8 bg-blue-400 p-2 rounded-lg shadow-md active:bg-blue-600"
        >
          Search
        </button>
        {loading && <div>loading...</div>}
      </div>
      {error && <div>{error}</div>}
      <div>
        <ul className="p-4 text-gray-900 text-lg lg:text-2xl">
          {geoCodes.map((geoCode) => {
            const { name, country, lat } = geoCode;
            return (
              <li key={`${name}${country}${lat}`}>
                <button
                  onClick={() => handleGeoLocation(geoCode)}
                  className="btn-location-list mb-5 md:mb-0"
                >
                  {name} {country}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ul className="md:flex">
          {sevenDays.map((sevenDay) => {
            const { icon, main } = sevenDay.weather[0];
            return (
              <li className="flex-1 bg-white text-gray-500 rounded-lg shadow-xl p-4 font-bold hover:bg-gray-700 hover:text-white">
                {`${moment(sevenDay.dt * 1000).format("DD/MM/YY")}`}
                <div>{`${main}`}</div>
                <img
                  className=""
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default LandPage;
