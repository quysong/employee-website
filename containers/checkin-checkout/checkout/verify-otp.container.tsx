import Loading from "components/loading";
import BasicModal from "components/modal";
import ToastContainer from "containers/toast/toast.container";
import { sendRequest } from "helpers/api";
import { formatPhoneFromUrl } from "helpers/common";
import useAppStorage from "hooks/useAppStorage";
import useTrans from "hooks/useTrans";
import { CheckinCheckoutGeoLocation } from "interfaces/checkin-checkout.interface";
import { NotificationType } from "interfaces/notification.interface";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import VerifyOtpView from "views/verify-otp/verify-otp.view";

let submittedFlowOtp = false;
const VerifyOtpContainer = () => {
  const { appStorage, setStorage } = useAppStorage();
  const [location, setLocation] = useState<CheckinCheckoutGeoLocation>();

  const { t } = useTrans();
  const { query } = useRouter();
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

  const { otp } = watch();
  const { push } = useRouter();

  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>({
    text: null,
    type: null,
  });

  useEffect(() => {
    if (otp?.length === 6) {
      clearErrors("otp");
      return;
    }
    setValue("otp", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, otp]);

  useEffect(() => {
    if (appStorage.sessionId) {
      push({
        pathname: "/checkin-checkout/checkin",
        query,
      });
    }
  }, [appStorage]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        console.log("latitude: %s longitude: %s", latitude, longitude);
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (
      !query?.first_name ||
      !query?.phone_number ||
      !query?.otp_code ||
      !location
    )
      return;
    const otp_code = query.otp_code;
    if (otp_code && !submittedFlowOtp) {
      submittedFlowOtp = true;
      onSubmit({ otp: otp_code || "" });
    }
  }, [query, location]);

  const onCheckoutSubmit = async (sessionId: string | null) => {
    if (!location) {
      setNotification({
        text: "Cannot get location information. Please refresh page and allow access location service.",
        type: "error",
      });
      setIsShowLoading(false);
      return;
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        type: "checkout",
        latitude: location?.latitude,
        longitude: location?.longitude,
      }),
      headers: {
        "X-Openerp-Session-Id": sessionId,
      },
    };
    const responseData = await sendRequest(
      `private/employee_checkin_checkout?X-Openerp-Session-Id=${sessionId}`,
      options
    );
    if (responseData.code && responseData.code != 200) {
      setNotification({
        text: responseData.description,
        type: "error",
      });
      setIsShowLoading(false);
      return;
    }
    if (responseData) {
      // TODO handle success request
      push({
        pathname: "/checkin-checkout/checkout/confirm",
        query: {
          ...query,
          ...{ latitude: location.latitude, longitude: location.longitude },
        },
      });
    }
  };

  const onSubmit = async (values: { otp: string | any[] }, event?: any) => {
    if (values?.otp.length < 6) {
      setError("otp", {
        message: "The number code is wrong",
        type: "required",
      });
      return Promise.resolve();
    }
    setIsShowLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify({
        phone_number: formatPhoneFromUrl(query.phone_number as string),
        otp_code: values?.otp,
      }),
    };

    const responseData = await sendRequest("public/employee_otp/auth", options);

    if (responseData.session && responseData.session?.sid) {
      //TODO call api submit dataa
      console.log("setStorage()");
      setStorage({
        ...appStorage,
        sessionId: responseData.session?.sid,
      } as any);
      onCheckoutSubmit(responseData?.session?.sid || null);
    } else {
      setNotification({
        text: responseData.description,
        type: "error",
      });
    }

    setIsShowLoading(false);
  };

  const resendOtp = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        phone_number: formatPhoneFromUrl(query.phone_number as string),
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

      return;
    } else {
    }
  };

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
      <ToastContainer
        notification={notification}
        setNotification={setNotification}
      />
      <VerifyOtpView
        t={t}
        phoneNumber={query.phone_number}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errorMessage={errors.otp?.message}
        resendOtp={resendOtp}
        count={count}
        firstName={query.first_name}
        initialValue={query.otp_code?.toString() || undefined}
      />
    </Suspense>
  );
};

export default VerifyOtpContainer;
