import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  <div style={{zIndex:'99'}} className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
