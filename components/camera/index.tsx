import Loading from "components/loading";
import React, {  RefObject } from "react";
import {
  ButtonTrigger,
  CameraContainer,
  ContainerLoading,
  Control,
  Video,
  ViewBox,
} from "./camera.style";
import Webcam from "react-webcam";
import { GLOBAL_COLOR } from "constants/style";

interface CameraProps {
  doScreenshot: () => void;
  loading: boolean;
  canvasRef: any
}

const Camera = ({
  doScreenshot,
  loading,
  canvasRef
}: CameraProps) => {
  return (
    <CameraContainer>
      <ContainerLoading>{loading ? <Loading /> : <></>}</ContainerLoading>
      <ViewBox>
        <Webcam
          mirrored={false}
          audio={false}
          screenshotFormat="image/png"
          width={'100%'}
          ref={canvasRef}
          videoConstraints={{
            width: 300,
            height: 500,
            facingMode: "environment"
          }}/>
      </ViewBox>
     
      <Control>
        <ButtonTrigger onClick={doScreenshot} />
      </Control> 
    </CameraContainer>
  );
};
export default Camera;
