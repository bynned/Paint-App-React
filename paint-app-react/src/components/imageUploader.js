import { useState, useRef } from "react";
import "../App.css";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);

  const handleBrowseClick = () => {
    inputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const { clientX, clientY } = e;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setOffset({ x: clientX - left, y: clientY - top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const { clientX, clientY } = e;
      setPosition({ x: clientX - offset.x, y: clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="ImageUploader"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: "absolute", top: position.y, left: position.x }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <button onClick={handleBrowseClick}>Browse pictures</button>
      {image && <img src={image} alt="uploaded" />}
    </div>
  );
}

export default ImageUploader;
