import React, { useEffect, useRef } from "react";
import Chat from "./chat";
import Step from "./step";

const AFrameARComponent: React.FC = () => {

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Scène A-Frame pour la webcam */}
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        {/* Entité A-Frame pour la webcam */}
      </a-scene>

      {/* Panneau de fenêtre gauche */}
      {/* <div
        style={{
          position: "absolute",
          top: "30px",
          left: "10px",
          width: "720px",
          height: "480px",
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
          controls
        >
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div> */}

      {/* Panneau de fenêtre droit avec vidéo */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "10px",
          width: "300px", // Vous pouvez ajuster la largeur pour le ratio vidéo souhaité
          height: "200px", // Ajuster la hauteur pour maintenir le ratio d'aspect de la vidéo
          backgroundColor: "#000", // Fond noir pour la vidéo
          zIndex: 10,
        }}
      ></div>

      {/* Autres éléments d'interface utilisateur ici */}

      {/* Card in the bottom left corner */}
        {/* <div
          style={{
            position: "absolute",
            bottom: "10px", // Adjust as needed
            left: "10px", // Adjust as needed
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white background
            borderRadius: "10px",
            zIndex: 10,
          }}
        >
          <p>Card content goes here...</p>
        </div> */}
        <Chat/>
        <Step/>
    </div>
  );
};

export default AFrameARComponent;
