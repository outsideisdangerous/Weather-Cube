import React, { useState } from "react";
import fetchGeoCode from "../Utils/geoCode.util";
import fetchWeather from "../Utils/oneCall.utils";
import moment from "moment";

function LandPage({ location, setLocation }) {
  const [geoCodes, setGeoCodes] = useState([]);
  const [sevenDays, setSevenDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setLocation(event.target.value);
    setGeoCodes([]);
    setSevenDays([]);
  };

  const handleBtn = async (event) => {
    try {
      setLoading(true);
      const geoResults = await fetchGeoCode(location);
      if (!geoResults.length) {
        throw new Error("hello");
      }
      setGeoCodes(geoResults);

      setLoading(false);
    } catch (error) {
      alert(error.message);
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
          className="p-1 h-10"
          type="text"
          name="location"
          placeholder="Enter location here"
          onChange={handleChange}
        />
        <button onClick={handleBtn} disabled={location.length < 2}>
          Search
        </button>
        {loading && <span>loading</span>}
      </div>
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
