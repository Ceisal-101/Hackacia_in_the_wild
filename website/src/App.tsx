import React from 'react';
import './App.css';
import Chat from './components/chat';
import WebcamView from './components/webcam';
import AFrameARComponent from './components/AFrameARComponent';

function App() {
  return (
    <div className="app-container">
      <AFrameARComponent />
    </div>
  );
}

export default App;
