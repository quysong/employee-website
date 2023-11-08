import { formatDateDMY, formatDateYMD, handleCheckDate, isDateValid } from "helpers/date";
import useAppStorage from "hooks/useAppStorage";
import useTrans from "hooks/useTrans";
import { NotificationType } from "interfaces/notification.interface";
import { ErrorsType, ValuesStep1Type } from "interfaces/onboard.interface";
import React, { useRef, useState } from "react";
import Step1 from "views/onboard/step1.view";

interface Step1ContainerProps {
  setNotification: (value: NotificationType) => void;
  setIndexSwipe: (index: number) => void;
  indexSwipe: number;
  [x: string]: any;
  setIsShowLoading: (value: boolean) => void;
  isShowLoading: boolean;
}

const Step1Container: React.FC<Step1ContainerProps> = ({
  setNotification,
  setIndexSwipe,
  indexSwipe,
  slides,
  setSlides,
  setStorage,
  appStorage
}) => {
  const { t } = useTrans();

  const step1Ref = useRef<any>(null);

  const birthday = appStorage?.onboard?.step1?.birthday;
  const [values, setValues] = useState<ValuesStep1Type>({
    day: birthday?.day || '',
    month: birthday?.month || '',
    year: birthday?.year || '',
  });

  const [errors, setErrors] = useState<ErrorsType>({
    day: null,
    month: null,
    year: null,
    step1Error: null,
  });

  const onSubmit = () => {
    setErrors({
      day: null,
      month: null,
      year: null,
      step1Error: null,
    });
    //TODO submit
    const date = formatDateYMD(values.day, values.month, values.year);
    if (!isDateValid(date, "YYYY/MM/DD")) {
      const errorForm = [
        handleCheckDate("day", values.day).error,
        handleCheckDate("month", values.month).error,
        handleCheckDate("year", values.year).error,
      ];
      const errorFirstOrNull = errorForm.find((ele) => !!ele) || null;
      setNotification({
        text: errorFirstOrNull,
        type: 'error'
      });
      setErrors({
        ...errors,
        day: errorForm[0],
        month: errorForm[1],
        year: errorForm[2],
        step1Error: errorFirstOrNull,
      });
      return;
    }
    const now = new Date();
    now.setHours(0,0,0,0);
    const selectedDate = new Date(date);
    if (selectedDate >= now) {
      setErrors({
        ...errors,
        step1Error: t('errorBirthDay'),
      });
      return;
    }
    setStorage({
      ...appStorage,
      onboard: {
        ...appStorage.onboard,
        step1: {
          birthday: {
            day: values.day,
            month: values.month,
            year: values.year
          }
        },
        focus: {
          index: 1,
          steps: {
            step1: true,
            step2: true,
          }
        }
      }
    })
    setSlides({ ...slides, step2: true });
    setIndexSwipe(indexSwipe + 1);
  };

  const onChangeValues = (value: string, type: "day" | "month" | "year") => {
    if(['day','month'].includes(type) && value?.length <= 2) {
      setValues({
        ...values,
        [type]: value
      }) 

      if(value?.length >= 2){
        if(type==='day'){
          const checkDay = handleCheckDate(type, value);
          setErrors({
            ...errors,
            day: checkDay.error,
          });
          if(checkDay.status){
            step1Ref.current[1].focus()
          }
        }
        if(type==='month'){
          const checkMonth = handleCheckDate(type, value);
          setErrors({
            ...errors,
            month: checkMonth.error,
          });
          if(checkMonth.status){
            step1Ref.current[2].focus()
          }
        }
        return;
      }
    }
    if(type === 'year'){
      if(value?.length <= 4){
        setValues({
          ...values,
          [type]: value
        })
        const checkYear = handleCheckDate(type, value);
        setErrors({
          ...errors,
          year: checkYear.error,
        });
        return;
      }
    }
  };

  return (
    <Step1
      t={t}
      formRef={step1Ref}
      onSubmitStep1={onSubmit}
      values={values}
      errors={errors}
      onChangeValues={onChangeValues}
    />
  );
};
export default Step1Container;
