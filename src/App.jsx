import React from "react";
import { HashRouter as Router } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import ParentRoute from "./route/ParentRoute";
const App = () => {
  return (
    <ContextProvider>
      <Router>
        <ParentRoute />
      </Router>
    </ContextProvider>
  );
};
export default App;
