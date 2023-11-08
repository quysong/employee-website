import { removeHeadBase64 } from "helpers/common";
import useTrans from "hooks/useTrans";
import { NotificationType } from "interfaces/notification.interface";
import {
  ObjectUrlImageType,
  TypeImageCardId,
  ValuesStep2Type
} from "interfaces/onboard.interface";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Step2 from "views/onboard/step2.view";

interface Step2ContainerProps {
  [x: string]: any;
  setIsShowModalCamera: (value: boolean) => void;
  setTypeImageCardId: (value: TypeImageCardId) => void;
  objectUrlImage: ObjectUrlImageType;
  setIndexSwipe: (index: number) => void;
  indexSwipe: number;
  setNotification: (value: NotificationType) => void;
  setIsShowLoading: (value: boolean) => void;
  isShowLoading: boolean;
}

const Step2Container = ({
  setIsShowModalCamera,
  setTypeImageCardId,
  objectUrlImage,
  indexSwipe,
  setIndexSwipe,
  slides,
  setSlides,
  setStorage,
  appStorage
}: Step2ContainerProps) => {
  const { t } = useTrans();
  
  const step2Data = appStorage?.onboard?.step2;

  const {
    register,
    formState: { errors, isSubmitted, isValid, submitCount },
    setError,
    clearErrors,
    handleSubmit,
    watch,
    setValue,
  } = useForm({ defaultValues: { cardId: step2Data?.national_id || "", images: "" } });

  const { cardId } = watch();

  const formatNationalId = (txt: string) => {
    return Array.from(txt.replace(/\s/g, ""))
      .map((item: string, index: number) =>
        [2, 4, 6].includes(index) ? `${item} ` : item
      )
      .join("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^[\d ]*$/.test(e.target.value)) return;
    setValue("cardId", e.target.value);
  };

  const onKeyUp = (ev: any) => {
    if (ev.key !== "Delete" && ev.key !== "Backspace") {
      setValue("cardId", formatNationalId(ev.target.value || ""));
    } else {
      setValue("cardId", ev.target.value);
    }
  };

  useEffect(() => {
    if (isSubmitted && (!objectUrlImage.backUrl || !objectUrlImage.frontUrl)) {
      setError("images", {
        message: "This field is required",
        type: "required",
      });
      return;
    }

    clearErrors("images");
  }, [isSubmitted, isValid, objectUrlImage, submitCount]);

  const onSubmit = (values: ValuesStep2Type) => {
    if (!objectUrlImage.backUrl || !objectUrlImage.frontUrl) {
      setError("images", {
        message: "This field is required",
        type: "required",
      });
      return;
    }
    setStorage({
      ...appStorage,
      onboard: {
        ...appStorage.onboard,
        step2: {
          national_id: cardId,
          national_card_front: objectUrlImage.frontUrl,
          national_card_back: objectUrlImage.backUrl,
        },
        focus: {
          index: 2,
          steps: {...appStorage.onboard.focus.steps, step3: true}
        }
      }
    })
    setSlides({
      ...slides,
      step3: true,
    });
    setIndexSwipe(indexSwipe + 1);
  };

  const onOpenCamera = (type: TypeImageCardId) => {
    setIsShowModalCamera(true);
    setTypeImageCardId(type);
  };

  return (
    <Step2
      onOpenCamera={onOpenCamera}
      objectUrlImage={objectUrlImage}
      t={t}
      onKeyUp={onKeyUp}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      value={cardId}
      onChange={onChange}
    />
  );
};

export default Step2Container;
