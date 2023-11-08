import Camera from "components/camera";
import { TypeImageCardId } from "interfaces/onboard.interface";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const MIN_FILE_SIZE = 512000; //3MB

const constraints: any = {
  video: {
    width: { min: 360, ideal: 1280, max: 420 },
    height: { min: 280, ideal: 720, max: 280 },
    facingMode: "environment",
  },
};

interface CameraContainerProps {
  type: TypeImageCardId;
  setUrlImage: (url: string, type: TypeImageCardId) => void;
}

const CameraContainer: React.FC<CameraContainerProps> = ({
  setUrlImage,
  type,
}) => {
  const webcamRef: any = React.useRef(null);

  const [loading, setLoading] = useState<boolean>(true);

  const resizeImage = (
    percentage: number = 0.95,
    minSize: number = MIN_FILE_SIZE
  ) => {
    try {
      if (webcamRef?.current) {
        webcamRef.current.width = webcamRef.current.width * percentage;
        webcamRef.current.height = webcamRef.current.height * percentage;
        webcamRef.current.ctx?.translate(
          webcamRef.current.width / 2,
          webcamRef.current.height / 2
        );
        webcamRef.current.ctx?.rotate((90 * Math.PI) / 180);
        webcamRef.current.ctx?.drawImage(
          webcamRef.current,
          -webcamRef.current.width / 2,
          -webcamRef.current.height / 2
        );
        webcamRef.current.ctx?.restore();
        if (
          webcamRef.current?.getScreenshot() &&
          webcamRef.current?.getScreenshot()?.length >= minSize
        ) {
          resizeImage(percentage, minSize);
        }
      }
    } catch (error) {
    }
  };

  const doScreenshot = () => {
    try {
      if (webcamRef?.current) {
        setLoading(true);
        resizeImage();
        const imageSrc = webcamRef.current.getScreenshot();
        setTimeout(() => {
          setLoading(false);
          setUrlImage(imageSrc, type);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(()=> {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [])

  return (
    <Camera
      doScreenshot={doScreenshot}
      loading={loading}
      canvasRef={webcamRef}
    />
  );
};
export default CameraContainer;
