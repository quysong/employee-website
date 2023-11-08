import { useRouter } from "next/router";
import Step5 from "views/onboard/step5.view";

type Step5ContainerType = {
  [x:string]: any
}

const Step5Container: React.FC<Step5ContainerType> = ({setSlides, setIndexSwipe, setStorage, appStorage}) => {
  const {reload,  query: { first_name}} = useRouter();
  const clearStepDataInStorage = ()=> {
    setStorage({
      ...appStorage, 
      onboard: null,
      sessionId: appStorage?.sessionId
    });
    
    setIndexSwipe(0);
    setSlides({ step1: true });
    reload();
  }
  return (
    <Step5 reload={clearStepDataInStorage} firstName={first_name}/>
  )
}

export default Step5Container;
