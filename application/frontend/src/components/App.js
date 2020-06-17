import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import Pages from "../pages/Pages";

function App() {
  const [data, setData] = useState(null);

  // Fetch user data
  useEffect(() => {
    async function fetchUserAPI() {
      let response = await fetch("/api/v1/users/" + window.userData.id);
      response = await response.json();
      console.log(response);
      setData(response);
    }
    fetchUserAPI();
  }, []);

  return <Pages userData={data} />;
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
