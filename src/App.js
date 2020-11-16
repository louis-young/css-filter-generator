import React, { useState } from "react";

import "./stylesheets/main.scss";

import Form from "./components/Form/Form";
import Layout from "./components/Layout/Layout";

const App = () => {
  const [colour, setColour] = useState(null);

  return (
    <div className="App">
      <Layout>
        <Form colour={colour} setColour={setColour} />
      </Layout>
    </div>
  );
};

export default App;
