// step.js
import Schema from './schema';
import Chat from './chat';
import Video from './video';
import './step.css';

function Step({ i } : any) {
    const videoSources = ["src/assets/video/video1.mov", "src/assets/video/video2.mov", "src/assets/video/video3.mov", "src/assets/video/video4.mov", "src/assets/video/video5.mov", "src/assets/video/video6.mov", "src/assets/video/video7.mov", "src/assets/video/video8.mov", "src/assets/video/video9.mov", "src/assets/video/video10.mov", "src/assets/video/video11.mov", "src/assets/video/video12.mov", "src/assets/video/video13.mov", "src/assets/video/video14.mov", "src/assets/video/video15.mov", "src/assets/video/video16.mov", "src/assets/video/video17.mov"];
    const schemaSources = ["src/assets/schema/step1.png", "src/assets/schema/step2.png", "src/assets/schema/step3.png", "src/assets/schema/step4.png", "src/assets/schema/step5.png", "src/assets/schema/step6.png", "src/assets/schema/step7.png", "src/assets/schema/step8.png", "src/assets/schema/step9.png", "src/assets/schema/step10.png", "src/assets/schema/step11.png", "src/assets/schema/step12.png", "src/assets/schema/step13.png", "src/assets/schema/step14.png", "src/assets/schema/step15.png", "src/assets/schema/step16.png", "src/assets/schema/step17.png"];


    return (
        <div className="step-container">
            <Video src={videoSources[i]} />
            <Schema src={schemaSources[i]} />
            <Chat />
        </div>
    );
}

export default Step;
