import React, { useEffect, useState, useCallback } from "react";
import fetchGeoCode from "../Utils/geoCode.util";

function LandPage({ location, setLocation }) {
  const [geoCodes, setGeoCodes] = useState([]);

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

  return (
    <div>
      <input
        type="text"
        name="location"
        placeholder="Enter location here"
        onChange={handleChange}
      />
      <h1>
        {geoCodes.map((geoCode) => {
          return `${geoCode.name} ${geoCode.country}`; // geoCode = {name: "Lon", country: "UK"}
        })}
      </h1>
    </div>
  );
}

export default LandPage;
