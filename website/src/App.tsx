import React from 'react';
import './App.css';
import Chat from './components/chat';
import WebcamView from './components/webcam';
import AFrameARComponent from './components/AFrameARComponent';
import { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawCanvas } from "./utils/drawCanvas";

const HandDetection = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();

  const onResults = useCallback((results: Results) => {
    resultsRef.current = results;

    const canvasCtx = canvasRef.current!.getContext("2d")!;
    drawCanvas(canvasCtx, results);
  }, []);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }
  }, [onResults]);

  const OutputData = () => {
    const results = resultsRef.current!;
    console.log(results);
  };

  return (
    <div className={styles.container}>
      {/* 비디오 캡쳐 */}
      <Webcam
        audio={false}
        style={{ visibility: "hidden" }}
        width={1280}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
      />
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={1280}
        height={720}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={OutputData}>
          Output Data
        </button>
      </div>
    </div>
  );
};

// ==============================================
// styles

const styles = {
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  canvas: css`
    position: absolute;
    width: 1280px;
    height: 720px;
    background-color: #fff;
  `,
  buttonContainer: css`
    position: absolute;
    top: 20px;
    left: 20px;
  `,
  button: css`
    color: #fff;
    background-color: #0082cf;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
  `,
};

function App() {
  return (
    <div className="app-container">
      <HandDetection />
      {/* <AFrameARComponent /> */}
    </div>
  );
}

export default App;
