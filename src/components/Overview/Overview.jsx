import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

const Overview = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    switch (locationPath) {
      case "/":
        setActiveItem("Overview");
        break;
      case "/Direct_Visitors":
        setActiveItem("Overview");
        break;
      case "/Channel_Visitors":
        setActiveItem("ChannelVisitors");
        break;
      case "/Channel_Partners":
        setActiveItem("ChannelPartners");
        break;
      case "/Project":
        setActiveItem("Project");
        break;
      case "/Team":
        setActiveItem("Team");
        break;

      default:
        setActiveItem("DirectVisitors");
        break;
    }
  }, []);
  console.log(activeItem);
  return (
    <div>
      <BreadCrumbs />
    </div>
  );
};

export default Overview;
