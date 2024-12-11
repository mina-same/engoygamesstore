  "use client";

import React, { useState } from "react";
import PrizeWheelPopup from "@/components/PrizeWheelPopup";

const PrizeWheelClient = () => {
  const [isWheelVisible, setWheelVisible] = useState(false);

  const handleOpenWheel = () => setWheelVisible(true);
  const handleCloseWheel = () => setWheelVisible(false);

  return (
    <>
      <button
        onClick={handleOpenWheel}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Prize Wheel
      </button>

      <PrizeWheelPopup visible={isWheelVisible} onClose={handleCloseWheel} />
    </>
  );
};

export default PrizeWheelClient;
