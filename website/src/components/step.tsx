// step.js
import Schema from './schema';
import Chat from './chat';
import Video from './video';
import './step.css';

function Step({ i } : any) {
    const videoSources = ["src/assets/video/video1.mov", "src/assets/video/video2.mov"];
    const schemaSources = ["src/assets/schema/step1.png", "src/assets/schema/step2.png"];


    return (
        <div className="step-container">
            <Video src={videoSources[i]} />
            <Schema src={schemaSources[i]} />
            <Chat />
        </div>
    );
}

export default Step;
