import React, { useState, useCallback } from "react";
import fetchGeoCode from "../Utils/geoCode.util";
import fetchWeather from "../Utils/oneCall.utils";
import moment from "moment";

function LandPage({ location, setLocation }) {
  const [geoCodes, setGeoCodes] = useState([]);
  const [sevenDays, setSevenDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setLocation(event.target.value);
    // if (event.target.value.length > 2) {
    // disabled = false;
    setGeoCodes([]);
    setSevenDays([]);
  };

  const handleBtn = async (event) => {
    try {
      const geoResults = await fetchGeoCode(location);
      setGeoCodes(geoResults);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   // 1. Use then-catch chaining
  //   fetchGeoCode(location).then((geoCodes) => {
  //     console.log({ geoCodes });
  //   });
  // }, [location]);

  // useEffect(() => {
  //   // 2. Define the async function within use effect
  //   const fetchGeoCodeAsync = async () => {
  //     const geoCodes = await fetchGeoCode(location);
  //     console.log({ geoCodes });
  //   };
  //   fetchGeoCodeAsync();
  // }, [location]);

  // let geoCodes = []; // This is a variable, but NOT a state

  // 3. Using useCallback, can move this inside a custom hook.
  const fetchGeoCodeAsync = useCallback(async () => {
    try {
      const _geoCodes = await fetchGeoCode(location); // returns an array
      setGeoCodes(_geoCodes);
    } catch (error) {
      console.log(error.message);
    }
  }, [location]);

  const handleGeoLocation = async (geoCode) => {
    setLoading(true);
    const { lat, lon } = geoCode;
    const sevenDay = await fetchWeather(lat, lon);
    setSevenDays(sevenDay);
    setLoading(false);
  };

  // const iconURL = (sevenDay) => {
  //   const icon = sevenDay.weather[0].main
  //   const URL = "http://openweathermap.org/img/wn/'icon'@2x.png";
  // }

  return (
    <>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Enter location here"
          onChange={handleChange}
        />
        <button onClick={handleBtn} disabled={location.length < 2}>
          Search
        </button>
      </div>
      <div>
        <ul>
          {geoCodes.map((geoCode) => {
            const { name, country } = geoCode;
            return (
              <li>
                <button
                  onClick={() => handleGeoLocation(geoCode)}
                  className="btn-location-list"
                >
                  {name} {country}
                </button>
              </li>
            );
            // geoCode = {name: "Lon", country: "UK"}
          })}
        </ul>
      </div>
      <div>
        <ul>
          {sevenDays.map((sevenDay) => {
            const { icon, main } = sevenDay.weather[0];
            return (
              <li>
                <span>{moment(sevenDay.dt * 1000).format("DD/MM/YY")}</span>
                {main}
                <img
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
