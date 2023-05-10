import { useEffect, useRef, useState } from "react";
import "../App.css";

function CanvasCom({ lineWidth, lineColor, lineOpacity, paintingStatus }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialization when the component mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(paintingStatus);
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    console.log(paintingStatus);
    if (!paintingStatus) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    console.log(paintingStatus);
    if (!paintingStatus) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    console.log(paintingStatus);
    if (!isDrawing || !paintingStatus) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  return (
    <div className="PaintApp">
      <div className="draw-area">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`794px`}
          height={`1123px`}
        />
      </div>
    </div>
  );
}

export default CanvasCom;
