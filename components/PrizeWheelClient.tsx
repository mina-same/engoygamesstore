"use client";

import React, { useState } from "react";
import PrizeWheelPopup from "@/components/PrizeWheelPopup";

const PrizeWheelClient = () => {
  const [isWheelVisible, setWheelVisible] = useState(false);

  const handleCloseWheel = () => setWheelVisible(false);

  return (
    <>
      <PrizeWheelPopup visible={isWheelVisible} onClose={handleCloseWheel} />
    </>
  );
};

export default PrizeWheelClient;
