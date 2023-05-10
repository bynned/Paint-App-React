import React, { useState } from "react";
import "../App.css";
import TextArea from "./AddText";
import ImageUploader from "./imageUploader";

const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  setPaintingStatus,
  paintingStatus,
}) => {
  const [textAreas, setTextAreas] = useState([]);
  const [fontSize, setFontSize] = useState(12);
  const [fontStyle, setFontStyle] = useState("Arial");

  const handleAddTextArea = () => {
    const newTextArea = (
      <TextArea
        key={textAreas.length}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
      />
    );
    setTextAreas([...textAreas, newTextArea]);
  };

  function togglePaintingStatus() {
    setPaintingStatus((prevStatus) => !prevStatus);
    console.log(paintingStatus);
  }

  return (
    <div className="Menu">
      <div>
        <label>Brush Color </label>
        <input
          type="color"
          onChange={(e) => {
            setLineColor(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Brush Width </label>
        <input
          type="range"
          min="3"
          max="20"
          onChange={(e) => {
            setLineWidth(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Brush Opacity</label>
        <input
          type="range"
          min="1"
          max="100"
          onChange={(e) => {
            setLineOpacity(e.target.value / 100);
          }}
        />
      </div>
      <div>
        <button onClick={togglePaintingStatus}>Toggle painting</button>
        {paintingStatus ? (
          <span> Painting is on</span>
        ) : (
          <span> Painting is off</span>
        )}
      </div>
      <br></br>
      <div>
        <button onClick={handleAddTextArea}>Add Text</button>
        {textAreas}
      </div>
      <div>
        <label>Font Size </label>
        <input
          type="range"
          min="10"
          max="50"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
        {fontSize}px
      </div>
      <div>
        <label>Font Style </label>
        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="oblique">Oblique</option>
        </select>
      </div>

      <br />
      <div>
        <ImageUploader />
      </div>
    </div>
  );
};

export default Menu;
