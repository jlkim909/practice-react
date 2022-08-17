import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BsEraserFill,
  BsMapFill,
  BsPencilFill,
  BsArrowCounterclockwise,
  BsTrashFill,
  BsDownload,
} from "react-icons/bs";
import DrawingTool from "./DrawingTool";
const Container = styled.div`
  width: 632px;
  height: 500px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  position: relative;
`;

const ToolBar = styled.div`
  width: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #404040;
`;

const Board = styled.canvas`
  width: 600px;
  height: 100%;
`;

const MiniBoard = styled.img`
  width: 200px;
  height: 144px;
  border: 4px solid black;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: -144px;
`;

const PenSizeControl = styled.div`
  width: 200px;
  height: 72px;
  box-sizing: border-box;
  position: absolute;
  left: 32px;
  background-color: #404040;
  bottom: -72px;
  display: flex;
  align-items: center;
`;

interface Coordinate {
  x: number;
  y: number;
}

function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [isPainting, setIsPainting] = useState(false);
  const [toolMode, setToolMode] = useState<"NONE" | "PEN" | "ERASER">("NONE");
  const [brushWeight, setBurshWeight] = useState<number>(5);
  const [navigatorSrc, setNavigatorSrc] = useState<string | undefined>(
    undefined
  );
  const [showNavigator, setShowNavigator] = useState(false);
  const [undoArray, setUndoArray] = useState<string[]>([]);

  const getCoordinate = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const boundaries = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - boundaries.left,
      y: e.clientY - boundaries.top,
    };
  };

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.strokeStyle = toolMode === "ERASER" ? "#FFFFFF" : brushColor; // 선 색깔
        context.lineJoin = "round";
        context.lineWidth = brushWeight; // 선 굵기

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
      }
    },
    [brushColor, toolMode, brushWeight]
  );

  const saveState = useCallback(() => {
    if (undoArray.length > 4) {
      setUndoArray((prev) => [
        ...prev.slice(1, 4),
        canvasRef.current?.toDataURL() as string,
      ]);
    } else {
      setUndoArray((prev) => [
        ...prev,
        canvasRef.current?.toDataURL() as string,
      ]);
    }
  }, [undoArray]);

  const onClickUndo = () => {
    if (!canvasRef.current) return;
    if (undoArray.length === 0) {
      alert("더이상 실행취소 불가합니다!");
      return;
    }
    let previousDataUrl = undoArray[undoArray.length - 1];
    setUndoArray((prev) => [...prev.slice(0, undoArray.length - 1)]);
    let previousImage = new Image();
    const context = canvasRef.current.getContext("2d");
    previousImage.onload = () => {
      context?.clearRect(0, 0, 600, 500);
      context?.drawImage(previousImage, 0, 0, 600, 500, 0, 0, 600, 500);
    };
    previousImage.src = previousDataUrl;
    updateNavigator();
  };

  const onClickClear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    context?.clearRect(0, 0, 600, 500);
    setUndoArray([]);
    updateNavigator();
  };

  const startPaint = useCallback(
    (event: MouseEvent) => {
      if (toolMode === "NONE") return;
      const coordinates = getCoordinate(event);
      if (coordinates) {
        setIsPainting(true);
        setMousePosition(coordinates);
      }
      saveState();
    },
    [toolMode, saveState]
  );

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault(); // drag 방지
      event.stopPropagation(); // drag 방지

      if (isPainting) {
        const newMousePosition = getCoordinate(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine]
  );

  const updateNavigator = useCallback(() => {
    if (!showNavigator) return;
    setNavigatorSrc(canvasRef.current?.toDataURL());
  }, [showNavigator]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    updateNavigator();
  }, [updateNavigator]);

  const onClickPen = () => {
    if (toolMode === "PEN") {
      setToolMode("NONE");
    } else {
      setToolMode("PEN");
    }
  };

  const onClickEraser = () => {
    if (toolMode === "ERASER") {
      setToolMode("NONE");
    } else {
      setToolMode("ERASER");
    }
  };
  const toggleNavigator = () => {
    setShowNavigator((prev) => !prev);
  };

  useEffect(() => {
    updateNavigator();
  }, [showNavigator, updateNavigator]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);
  return (
    <Container>
      <ToolBar>
        <DrawingTool
          onClick={onClickPen}
          Icons={BsPencilFill}
          isActive={toolMode === "PEN"}
        />
        <DrawingTool
          onClick={onClickEraser}
          Icons={BsEraserFill}
          isActive={toolMode === "ERASER"}
        />
        <DrawingTool
          Icons={BsMapFill}
          onClick={toggleNavigator}
          isActive={showNavigator}
        />
        <DrawingTool Icons={BsArrowCounterclockwise} onClick={onClickUndo} />
        <DrawingTool Icons={BsTrashFill} onClick={onClickClear} />
        <DrawingTool Icons={BsDownload} />
        <input
          type="color"
          style={{
            border: "none",
            padding: 0,
            width: "28px",
            height: "32px",
            backgroundColor: "#404040",
          }}
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
        />
      </ToolBar>
      <Board ref={canvasRef} height={500} width={600} />
      <PenSizeControl>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px",
            fontSize: "12px",
            gap: "8px",
            color: "white",
          }}
        >
          <label>Size</label>
          <input
            type="range"
            min={1}
            max={30}
            style={{ height: "6px" }}
            value={brushWeight}
            onChange={(e) => setBurshWeight(parseInt(e.target.value))}
          />
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: `${brushWeight + 2}px`,
              height: `${brushWeight + 2}px`,
              backgroundColor: "beige",
              borderRadius: "50%",
            }}
          />
        </div>
      </PenSizeControl>
      {showNavigator ? <MiniBoard src={navigatorSrc} alt="" /> : null}
    </Container>
  );
}

export default DrawingBoard;
