import React, { useEffect, useRef } from 'react';

const AFrameARComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Charger les scripts A-Frame et AR.js et initialiser la webcam
    // Vous pouvez aussi initialiser votre vidéo ici si nécessaire
  }, []);

  useEffect(() => {
    // Supposons que vous ayez une source vidéo à charger
    const videoSource = 'chemin/vers/votre/video.mp4';

    if (videoRef.current) {
      videoRef.current.src = videoSource;
      videoRef.current.play();
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Scène A-Frame pour la webcam */}
      <a-scene embedded arjs='sourceType: webcam;'>
        {/* Entité A-Frame pour la webcam */}
      </a-scene>

      {/* Panneau de fenêtre gauche */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '10px',
        width:  '720px',
        height: '480px',
        backgroundColor: '#fff',
        zIndex: 10
      }}>

        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black'
          }}
          controls
        >
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>

      {/* Panneau de fenêtre droit avec vidéo */}
      <div style={{
        position: 'absolute',
        top: '30px',
        right: '10px',
        width: '300px', // Vous pouvez ajuster la largeur pour le ratio vidéo souhaité
        height: '200px', // Ajuster la hauteur pour maintenir le ratio d'aspect de la vidéo
        backgroundColor: '#000', // Fond noir pour la vidéo
        zIndex: 10
      }}>
      </div>

      {/* Autres éléments d'interface utilisateur ici */}
    </div>
  );
};

export default AFrameARComponent;
