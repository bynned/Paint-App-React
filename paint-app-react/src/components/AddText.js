import { useState, useRef, useEffect } from "react";
import "../App.css";

function TextArea({ fontSize, fontStyle }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 900, y: 150 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const { clientX, clientY } = e;
        setPosition({ x: clientX - offset.x, y: clientY - offset.y });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, offset]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const { clientX, clientY } = e;
    const { left, top } = textareaRef.current.getBoundingClientRect();
    setOffset({ x: clientX - left, y: clientY - top });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <textarea
      rows={4}
      cols={40}
      className="TextArea"
      ref={textareaRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ position: "absolute",
      top: position.y,
      left: position.x,
      fontSize: `${fontSize}px`,
      fontStyle: fontStyle
    }}
    />
  );
}

export default TextArea;
