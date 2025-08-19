import React from "react";
import Context from "./Context";
import hitesh from "../assets/images/hitesh.jpg";
import piyush from "../assets/images/piyush.jpg";
const ContextProvider = ({ children }) => {
  const users = [
    {
      image: hitesh,
      name: "Hitesh Choudhary",
      descriptions:
        " Global tech educator with 1.7M+ subscribers. From corporate leadership to creating impact through accessible learning.",
    },
    {
      image: piyush,
      name: "Piyush Garg",
      descriptions:
        "Content creater educator, and entrepreneur known for his experties in the tech industry.",
    },
  ];
  return <Context.Provider value={{ users }}>{children}</Context.Provider>;
};
export default ContextProvider;
