import Loading from "components/loading";
import BasicModal from "components/modal";
import ToastContainer from "containers/toast/toast.container";
import useAppStorage from "hooks/useAppStorage";
import useTrans from "hooks/useTrans";
import { NotificationType } from "interfaces/notification.interface";
import {
  ActiveStepsType,
  ObjectUrlImageType,
  TypeImageCardId
} from "interfaces/onboard.interface";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useEffect, useState } from "react";
import OnboardView from "views/onboard/onboard.view";
import CameraContainer from "./camera.container";
import Step1Container from "./step1.container";
import Step2Container from "./step2.container";
import Step3Container from "./step3.container";
import Step4Container from "./step4.container";
import Step5Container from "./step5.container";

//data fake
const bulletList = [1, 2, 3, 4];

interface OnboardContainer {}

const OnboardContainer = (props: OnboardContainer) => {
  const { query } = useRouter();
  const { appStorage, setStorage } = useAppStorage();
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  const { t } = useTrans();
  const [indexSwipe, setIndexSwipe] = useState(0);
  const [notification, setNotification] = useState<NotificationType>({
    text: null,
    type: null
  });
  const [isShowModalCamera, setIsShowModalCamera] = useState<boolean>(false);
  const [typeImageCardId, setTypeImageCardId] =
    useState<TypeImageCardId>("frontUrl");

  const step2Data = appStorage?.onboard?.step2;
  const [objectUrlImage, setObjectUrlImage] = useState<ObjectUrlImageType>({
    backUrl: step2Data?.national_card_back || null,
    frontUrl: step2Data?.national_card_front || null,
  });
  const [slides, setSlides] = useState<ActiveStepsType>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });

  const arraySteps = (): React.ReactNode[] => {
    let arr: ReactNode[] = [];
    {
      Object.keys(slides).forEach((ele) => {
        if ((slides as any)[ele]) {
          if (ele === "step1") {
            arr.push(
              <Step1Container
                setNotification={setNotification}
                setIndexSwipe={setIndexSwipe}
                indexSwipe={indexSwipe}
                slides={slides}
                setSlides={setSlides}
                setIsShowLoading={setIsShowLoading}
                isShowLoading={isShowLoading}
                setStorage={setStorage}
                appStorage={appStorage}
              />
            );
          }
          if (ele === "step2") {
            arr.push(
              <Step2Container
                setTypeImageCardId={setTypeImageCardId}
                setNotification={setNotification}
                setIsShowModalCamera={setIsShowModalCamera}
                objectUrlImage={objectUrlImage}
                setIndexSwipe={setIndexSwipe}
                indexSwipe={indexSwipe}
                slides={slides}
                setSlides={setSlides}
                setIsShowLoading={setIsShowLoading}
                isShowLoading={isShowLoading}
                setStorage={setStorage}
                appStorage={appStorage}
              />
            );
          }
          if (ele === "step3") {
            arr.push(
              <Step3Container
                slides={slides}
                setSlides={setSlides}
                setIndexSwipe={setIndexSwipe}
                indexSwipe={indexSwipe}
                setNotification={setNotification}
                setIsShowLoading={setIsShowLoading}
                isShowLoading={isShowLoading}
                setStorage={setStorage}
                appStorage={appStorage}
              />
            );
          }
          if (ele === "step4") {
            arr.push(
              <Step4Container
                slides={slides}
                setSlides={setSlides}
                setIndexSwipe={setIndexSwipe}
                indexSwipe={indexSwipe}
                setNotification={setNotification}
                setIsShowLoading={setIsShowLoading}
                isShowLoading={isShowLoading}
                setStorage={setStorage}
                appStorage={appStorage}
              />
            );
          }
          if (ele === "step5") {
            arr.push(<Step5Container 
              setStorage={setStorage}
              appStorage={appStorage}
              setSlides={setSlides}
              setIndexSwipe={setIndexSwipe}
            />);
          }
        }
      });
    }
    return arr;
  };

  const setUrlImage = (url: string, type: TypeImageCardId) => {
    setObjectUrlImage({
      ...objectUrlImage,
      [type]: url,
    });
    setIsShowModalCamera(false);
  };

  useEffect(() => {
    if(appStorage.onboard?.isCompleted){
      setStorage({
        ...appStorage,
        onboard:{}
      })
      return;
    }
    if(appStorage.onboard?.focus){
      const focusStep = appStorage.onboard?.focus;
    
      setSlides({
        ...slides,
        ...focusStep.steps
      })
      setIndexSwipe(focusStep.index)
    }
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      {isShowLoading ? (
        <BasicModal>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        </BasicModal>
      ) : (
        <></>
      )}

      {isShowModalCamera ? (
        <BasicModal>
          <CameraContainer type={typeImageCardId} setUrlImage={setUrlImage} />
        </BasicModal>
      ) : (
        <></>
      )}

      <ToastContainer
        notification={notification}
        setNotification={setNotification}
      />
      <OnboardView
        bulletList={bulletList}
        indexSwipe={indexSwipe}
        setIndexSwipe={setIndexSwipe}
        phoneNumber={query.phone_number}
        t={t}
        query={query}
        arraySteps={arraySteps}
        slides={slides}
      />
    </Suspense>
  );
};

export default OnboardContainer;
