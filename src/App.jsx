import React, { useState } from "react";
import LandPage from "./Components/LandPage";

function App() {
  const [location, setLocation] = useState("");

  return (
    <div className="containerz space-y-5 lg:p-48">
      <LandPage location={location} setLocation={setLocation} />
    </div>
  );
}

export default App;
