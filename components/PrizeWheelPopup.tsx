"use client";

import React, { useState, useEffect, useCallback } from "react";

interface WheelPopupProps {
  visible: boolean;
  onClose: () => void;
}

const WheelPopup: React.FC<WheelPopupProps> = ({ visible, onClose }) => {
  const [state, setState] = useState({
    list: ["$100", "$500", "$9,999", "$1", "$60", "$1,000", "$4.44", "$0", "$333"],
    radius: 100,
    rotate: 0,
    easeOut: 0,
    angle: 0,
    top: null as number | null,
    offset: null as number | null,
    net: null as number | null,
    result: null as number | null,
    spinning: false,
    won: false,
  });

  const renderWheel = useCallback(() => {
    const numOptions = state.list.length;
    const arcSize = (2 * Math.PI) / numOptions;
    setState((prev) => ({ ...prev, angle: arcSize }));
    topPosition(numOptions, arcSize);

    let angle = 0;
    const canvas = document.getElementById("wheel") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = state.radius;

    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numOptions; i++) {
      const text = state.list[i];
      renderSector(i + 1, text, angle, arcSize, getColor(), ctx, x, y, radius);
      angle += arcSize;
    }
  }, [state.list, state.radius]);

  const topPosition = (num: number, angle: number) => {
    let topSpot: number | null = null;
    let degreesOff: number | null = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    }
    setState((prev) => ({ ...prev, top: topSpot ? topSpot - 1 : null, offset: degreesOff }));
  };

  const renderSector = (
    index: number,
    text: string,
    start: number,
    arc: number,
    color: string,
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    radius: number
  ) => {
    if (!ctx) return;
    const angle = index * arc;
    const textRadius = radius * 3.33 - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, start, start + arc, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.save();
    ctx.translate(
      x + Math.cos(angle - arc / 2) * textRadius,
      y + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const getColor = (): string => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  };

  useEffect(() => {
    if (visible) renderWheel();
  }, [visible, renderWheel]);

  const spin = () => {
    const randomSpin = Math.floor(Math.random() * 900) + 500;
    setState((prev) => ({
      ...prev,
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    }));

    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const getResult = (spin: number) => {
    const { angle, top, offset, list } = state;
    if (angle && offset !== null && top !== null) {
      let netRotation = ((spin % 360) * Math.PI) / 180;
      let travel = netRotation + offset;
      let count = top + 1;
      while (travel > 0) {
        travel = travel - angle;
        count--;
      }
      const result = count >= 0 ? count : list.length + count;
      setState((prev) => ({ ...prev, net: netRotation, result, won: true }));
    }
  };

  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      result: null,
      won: false,
      spinning: false,
    }));
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
      onClick={handleClose}
    >
      <div
        className="bg-white p-5 rounded-lg text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="absolute top-[10px] right-2 cursor-pointer text-xl font-bold"
          onClick={handleClose}
        >
          &#10005;
        </span>
        {state.won && (
          <div className="absolute top-0 left-0 right-0 text-center text-xl font-bold py-3 bg-yellow-500 animate__animated animate__fadeInUp">
            Congratulations! You won!
          </div>
        )}
        <span id="selector" className="relative top-[69px] large-arrow">&#9660;</span>
        <canvas
          id="wheel"
          width="500"
          height="500"
          style={{
            transform: `rotate(${state.rotate}deg)`,
            transition: `transform ${state.easeOut}s ease-out`,
          }}
        />
        <button
          className="m-2 border-2 border-black px-6 py-2 hover:bg-blue-500 transition-all disabled:opacity-50 disabled:pointer-events-none"
          onClick={spin}
          disabled={state.spinning || state.won}
        >
          Spin
        </button>
        {state.result !== null && (
          <div className="mt-5 text-lg font-bold">
            YOU WON: {state.list[state.result]}
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelPopup;
