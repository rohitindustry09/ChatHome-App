import React, { useState } from "react";

const ColorButtons = () => {
  const [selectedColor, setSelectedColor] = useState("red"); // Default color

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: selectedColor,
          marginBottom: "10px",
          border: "1px solid black",
        }}
      ></div>
      
      <button
        onClick={() => handleColorChange("red")}
        style={{
          backgroundColor: "red",
          color: "white",
          marginRight: "10px",
          border: selectedColor === "red" ? "2px solid black" : "none",
        }}
      >
        Red (Default)
      </button>

      <button
        onClick={() => handleColorChange("blue")}
        style={{
          backgroundColor: "blue",
          color: "white",
          marginRight: "10px",
          border: selectedColor === "blue" ? "2px solid black" : "none",
        }}
      >
        Blue
      </button>

      <button
        onClick={() => handleColorChange("green")}
        style={{
          backgroundColor: "green",
          color: "white",
          border: selectedColor === "green" ? "2px solid black" : "none",
        }}
      >
        Green
      </button>
    </div>
  );
};

export default ColorButtons;
