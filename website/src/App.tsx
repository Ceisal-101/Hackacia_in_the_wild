import React from 'react';
import './App.css';
import Chat from './components/chat';
import WebcamView from './components/webcam';

function App() {
  return (
    <div className="app-container">
      {/* camera on fullscreen */}
      <div className="fullscreen-video">
        <WebcamView />
      </div>
      {/* chat */}
    </div>
  );
}

export default App;
