import React, { useState } from 'react';
import './App.css';
import Chat from './components/chat';
import { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawCanvas } from "./utils/drawCanvas";
import Schema from './components/schema';
import Video from './components/video';
import Step from './components/step';
// import HandDetection from './components/handDetection';

function isThumbUp(landmarks : any) {
   // Vérification pour chaque doigt spécifique (index, majeur, annulaire, auriculaire)
   let thumbCmc = landmarks[1]; // Carpo-Métacarpienne (CMC) du pouce
   let thumbMcp = landmarks[2]; // Métacarpo-Phalangienne (MCP) du pouce
   let thumbIp = landmarks[3]; // Interphalangienne (IP) du pouce
   let thumbTip = landmarks[4]; // Bout du pouce
 
   // Landmarks des autres doigts
   let indexFingerMcp = landmarks[5];
   let middleFingerMcp = landmarks[9];
   let ringFingerMcp = landmarks[13];
   let pinkyMcp = landmarks[17];
 
   // Bout des doigts pour vérifier s'ils sont pliés
   let indexFingerTip = landmarks[8];
   let middleFingerTip = landmarks[12];
   let ringFingerTip = landmarks[16];
   let pinkyTip = landmarks[20];
 
   // Vérification si le pouce est étendu et orienté vers le haut
   let thumbExtended = thumbMcp.y < thumbCmc.y && thumbTip.y < thumbIp.y;
   let thumbOrientedUp = thumbTip.y < thumbCmc.y;
 
   // Vérification si les autres doigts sont pliés (pas étendus)
   let otherFingersNotExtended = (indexFingerTip.y > indexFingerMcp.y) &&
                                 (middleFingerTip.y > middleFingerMcp.y) &&
                                 (ringFingerTip.y > ringFingerMcp.y) &&
                                 (pinkyTip.y > pinkyMcp.y);
 
   // Pour un geste de pouce levé, le pouce doit être étendu et orienté vers le haut,
   // et les autres doigts ne doivent pas être complètement étendus
   if (thumbExtended && thumbOrientedUp && otherFingersNotExtended) {
     return true;
   }
   return false;
 }


 
 function HandDetection({ onThumbUp } : any) {
   const webcamRef = useRef<Webcam>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const resultsRef = useRef<Results>();

   const saveImage = (imgSrc : string, fileName : string) => {
     // Créer un élément <a> pour simuler un clic de téléchargement
     const link = document.createElement('a');
     link.href = imgSrc;
   
     // Définir le nom du fichier téléchargé
     link.download = fileName;
   
     // Simuler un clic sur le lien
     // Cela déclenchera le téléchargement du fichier image
     document.body.appendChild(link); // Ajouter le lien au document
     link.click(); // Cliquer sur le lien
   
     // Nettoyage: retirer le lien du DOM
     document.body.removeChild(link);
   };

  //  const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   saveImage(imageSrc, 'capture.png');
  // }, [webcamRef.current]);

  const onResults = useCallback((results: Results) => {
    resultsRef.current = results;

    const canvasCtx = canvasRef.current!.getContext("2d")!;
    drawCanvas(canvasCtx, results);
  }, []);

  const OutputData = () => {
    const results = resultsRef.current!;
    // let thumbIsUp = isThumbUp(results.multiHandLandmarks[0]);
    // console.log(thumbIsUp); // Affichera true si le pouce est en l'air, sinon false
    if (results.multiHandedness.length === 1) {
      if (results.multiHandedness[0].label === "Right") {
        var thumbIsUp = isThumbUp(results.multiHandLandmarks[0]);
        console.log(thumbIsUp);
        if (thumbIsUp)
        {
          // capture();
          onThumbUp()
        };
      }
    }
    else if (results.multiHandedness.length === 2) {
      if (results.multiHandedness[1].label === "Right") {
        var thumbIsUp = (isThumbUp(results.multiHandLandmarks[1]));
        console.log(thumbIsUp);
        if (thumbIsUp)
        {
          // capture();
          onThumbUp()
        };
      }
    }
    // console.log(results);

    // console.log(results);
  };


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
    
    const interval = setInterval(() => {
      if (resultsRef.current) {
        OutputData();
      }
    }, 2000);  // 1000 millisecondes = 1 seconde

    // Nettoyage de l'effet
    return () => clearInterval(interval);
  }, [onResults, OutputData]);

  

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
    height: 100vh;
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
    const [i, setI] = useState(0);

    const incrementIndex = useCallback(() => {
      if (i < 13)
      {
        console.log(i);
        setI(i => i + 1);
      }
    }, [i]);

    return (
        <div className="app-container">
            <HandDetection onThumbUp={incrementIndex} />
            <Step i={i} />
        </div>
    );
}

export default App;