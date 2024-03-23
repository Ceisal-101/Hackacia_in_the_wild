import React, { useEffect, useRef } from 'react';

function WebcamView() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Failed to get user media", err);
      }
    }

    getMedia();
  }, []);

  return <video ref={videoRef} autoPlay className="webcam"></video>;
}

export default WebcamView;
