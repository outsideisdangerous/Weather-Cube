import React, { useState } from "react";
import LandPage from "./Components/LandPage";

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
    <div className="container space-y-3 lg:p-48">
      <LandPage location={location} setLocation={setLocation} />
      {/* <WeatherView location={location} /> */}
    </div>
  );
}

export default App;
