import React from "react";
import "./MarkerButtons.css";

interface MarkerProps {
  handleEnableClickProps: () => void;
  handleDisableClickProps: () => void;
}


const MarkerButtons = ({
  handleEnableClickProps,
  handleDisableClickProps
}: MarkerProps) => {
  const handleEnableClick = () => {
    handleEnableClickProps();
  };

  const handleDisableClick = () => {
    handleDisableClickProps();
  };

  return (
    <div>
      <div className="markersContainer">
        <button
          type="button"
          onClick={handleEnableClick}
          className="enableMarker"
        >
          enable
        </button>
        <button
          type="button"
          onClick={handleDisableClick}
          className="disableMarker"
        >
          disable
        </button>
      </div>
    </div>
  );
};

export default MarkerButtons;
