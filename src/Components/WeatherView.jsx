import React, { useState, useEffect } from "react";
import fetchGeoCode from "../Utils/geoCode.util";
import { fetchWeather } from "../Utils/oneCall.utils";

function WeatherView({ location, numOfLocation }) {
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Requested weather results</h1>
    </div>
  );
}

export default WeatherView;
