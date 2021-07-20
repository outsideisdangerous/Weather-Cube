import React, { useEffect, useState, useCallback } from "react";
import fetchGeoCode from "../Utils/geoCode.util";
import fetchWeather from "../Utils/oneCall.utils";

function LandPage({ location, setLocation }) {
  const [geoCodes, setGeoCodes] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleChange = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
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

  useEffect(() => {
    fetchGeoCodeAsync();
  }, [fetchGeoCodeAsync]);

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Enter location here"
          onChange={handleChange}
        />
      </div>
      <div>
        {geoCodes.map((geoCode) => {
          return (
            <ul>
              <li>
                <button
                  onClick={() => console.log(`${geoCode.lat} ${geoCode.lon}`)}
                  className="btn-location-list"
                >
                  {geoCode.name} {geoCode.country}
                </button>
              </li>
            </ul>
          );
          // geoCode = {name: "Lon", country: "UK"}
        })}
      </div>
    </>
  );
}

export default LandPage;
