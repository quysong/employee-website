import { sendRequest } from "helpers/api";
import {
  cleanObject,
  formatPhoneFromUrl,
  removeHeadBase64,
} from "helpers/common";
import { formatDateDMY } from "helpers/date";
import useTrans from "hooks/useTrans";
import { NotificationType } from "interfaces/notification.interface";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import Step4 from "views/onboard/step4.view";

interface Step4ContainerProps {
  [x: string]: any;
  setNotification: (value: NotificationType) => void;
  setIsShowLoading: (value: boolean) => void;
  isShowLoading: boolean;
}

const Step4Container = ({
  indexSwipe,
  setIndexSwipe,
  slides,
  setSlides,
  setNotification,
  setIsShowLoading,
  isShowLoading,
  setStorage,
  appStorage,
}: Step4ContainerProps) => {
  const { t } = useTrans();
  const {
    query: { phone_number, user_id },
  } = useRouter();

  const refOtp: any = useRef();

  const {
    formState: { errors, submitCount, isSubmitted, isValid },
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm();

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 61,
    intervalMs: 1000,
  });

  const [errorMes, setErrorMes] = useState<string | null>();

  const { otp } = watch();
  useEffect(() => {
    if (otp?.length === 6) {
      clearErrors("otp");
      return;
    }
    setValue("otp", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, otp]);

  const callApiUpdateProfile = async (sessionId: string) => {
    setErrorMes(null);
    const birthday = appStorage.onboard.step1.birthday;
    const resUpdateProfile = await sendRequest("private/employee_profile", {
      method: "PUT",
      headers: {
        "X-Openerp-Session-Id": sessionId,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cleanObject({
          birthday: formatDateDMY(birthday.day, birthday.month, birthday.year),
          ...{
            ...appStorage.onboard.step2,
            national_card_front: removeHeadBase64(
              appStorage.onboard.step2.national_card_front
            ),
            national_card_back: removeHeadBase64(
              appStorage.onboard.step2.national_card_back
            ),
          },
          ...appStorage.onboard.step3,
        })
      ),
    });
    if (resUpdateProfile.status === "success") {
      resetCountdown();
      setSlides({
        ...slides,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: true,
      });
      setIndexSwipe(0);
    } else {
      if (resUpdateProfile.name) {
        setErrorMes(resUpdateProfile.name);
      } else {
        setErrorMes(resUpdateProfile.description);
      }
    }
    setIsShowLoading(false);
  };

  const onSubmit = async (values: { otp: string | any[] }) => {
    setErrorMes(null);
    if (isShowLoading) return;
    if (values?.otp.length < 6) {
      setError("otp", {
        message: "The number code is wrong",
        type: "required",
      });
      return;
    }
    setIsShowLoading(true);

    let responseData;
    if (user_id) {
      const options = {
        method: "POST",
        body: JSON.stringify({ user_id, otp_code: values?.otp }),
      };

      responseData = await sendRequest(
        "public/employee_otp/zalo_auth",
        options
      );
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify({
          phone_number: formatPhoneFromUrl(phone_number as string),
          otp_code: values?.otp,
        }),
      };

      responseData = await sendRequest("public/employee_otp/auth", options);
    }

    if (responseData?.session?.sid) {
      setStorage({
        ...appStorage,
        sessionId: responseData.session?.sid,
        onboard: {
          ...appStorage.onboard,
          isCompleted: true,
          focus: null,
        },
      });
      callApiUpdateProfile(responseData.session?.sid);
      return;
    }
    if (responseData.name) {
      setErrorMes(responseData.name);
    } else {
      setErrorMes(responseData.description);
    }

    setIsShowLoading(false);
  };

  const resendOtp = async () => {
    setValue("otp", "");
    refOtp.current.clear();
    setErrorMes(null);
    if (isShowLoading) return;
    setIsShowLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify({
        phone_number: formatPhoneFromUrl(phone_number as string),
      }),
      headers: {},
    };

    const responseData = await sendRequest(
      "public/employee_otp/resend",
      options
    );
    if (responseData.status === "success") {
      resetCountdown();
      startCountdown();
      setNotification({
        text: "send OTP success",
        type: "success",
      });
      setIsShowLoading(false);
      return;
    } else {
      setErrorMes(responseData.description);
      setIsShowLoading(false);
    }
  };

  return (
    <Step4
      t={t}
      phoneNumber={phone_number}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      setValue={setValue}
      errorMessage={errors.otp?.message ?? errorMes}
      resendOtp={resendOtp}
      count={count}
      refOtp={refOtp}
    />
  );
};

export default Step4Container;
