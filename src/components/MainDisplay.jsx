import React from "react";
import "../componentCss/mainDisplayCss.css";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import OpacityIcon from "@mui/icons-material/Opacity";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

function MainDisplay(props) {
  let weather = props.weatherType;
  function showIconAccordingWeather(weather) {
    switch (weather) {
      case "Clouds":
        return <FilterDramaIcon className="sun" fontSize="95px" />;
      case "Clear":
        return <WbSunnyOutlinedIcon className="sun" fontSize="95px" />;

      case "Snow":
        return <AcUnitIcon className="sun" fontSize="95px" />;

      case "Rain":
        return <OpacityIcon className="sun" fontSize="95px" />;

      case "Dust":
        return <GppMaybeIcon className="sun" fontSize="95px" />;

      case "Mist":
        return <FilterDramaIcon className="sun" fontSize="95px" />;
    }
  }

  return (
    <div className="mainDisplay">
      <img
        src={props.imgSrc}
        alt="weather img"
        className="mainDisplayBackground"
      />
      <div className="textCont">
        <div className="upSide">
          <h1 className="nameOfWeekDay">Tuesday</h1>
          <p className="date">{props.date}</p>
          <div className="location">
            <FmdGoodOutlinedIcon />
            <p className="place">
              {props.city}, {props.country}
            </p>
          </div>
        </div>
        <div className="bottomSide">
          {showIconAccordingWeather(weather)}
          <p className="celsius">
            {props.temperature}
            <span>℃</span>
          </p>
          <p className="tapeOfWeather">{weather}</p>
        </div>
      </div>
    </div>
  );
}

export default MainDisplay;
