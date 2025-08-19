import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Conversations from "../pages/Conversations";

const ParentRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conversation" element={<Conversations />} />
      </Routes>
    </>
  );
};
export default ParentRoute;
