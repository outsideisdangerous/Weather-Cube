import React, { useState } from "react";
import WeatherView from "./Components/WeatherView";
import LandPage from "./Components/LandPage";
import fetchGeoCode from "./Utils/geoCode.util";

function App() {
  const [location, setLocation] = useState("");

  // const viewWeather = async () => {
  //   const weatherInfo = await fetchGeoCode(
  //     location,
  //   );

  //   setWeather
  //   setWeatherTab(true);
  // }

  return (
    <div>
      <LandPage location={location} setLocation={setLocation} />
      {/* <WeatherView location={location} /> */}
    </div>
  );
}

export default App;
