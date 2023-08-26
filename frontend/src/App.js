import React from "react";
import Layout from "./layout";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
