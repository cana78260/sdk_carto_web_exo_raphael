import React from "react";
import "./MarkerButtons.css";

interface MarkerProps {
  handleEnableClickProps: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDisableClickProps: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const MarkerButtons = ({
  handleEnableClickProps,
  handleDisableClickProps
}: MarkerProps) => {
  const handleEnableClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleEnableClickProps(e);
  };

  const handleDisableClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleDisableClickProps(e);
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
