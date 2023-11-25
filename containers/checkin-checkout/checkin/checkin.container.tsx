import Loading from "components/loading";
import BasicModal from "components/modal";
import ToastContainer from "containers/toast/toast.container";
import { sendRequest } from "helpers/api";
import { formatPhoneFromUrl } from "helpers/common";
import useAppStorage from "hooks/useAppStorage";
import {
  CheckinCheckoutForm,
  CheckinCheckoutGeoLocation,
} from "interfaces/checkin-checkout.interface";
import { NotificationType } from "interfaces/notification.interface";
import { useRouter } from "next/router";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CheckinView from "../../../views/checkin-checkout/checkin/checkin.view";

interface CheckinContainer {}
let submittedFlowOtp = false;
const CheckinContainer = (props: CheckinContainer) => {
  const { push, query, asPath } = useRouter();
  const [location, setLocation] = useState<CheckinCheckoutGeoLocation>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({});

  const { appStorage, setStorage } = useAppStorage();

  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>({
    text: null,
    type: null,
  });

  const sendOtp = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        phone_number: formatPhoneFromUrl(query.phone_number as string),
      }),
      headers: {},
    };
    setIsShowLoading(true);
    const responseData = await sendRequest(
      "public/employee_otp/resend",
      options
    );
    if (responseData.status === "success") {
      push({
        pathname: "/checkin-checkout/checkin/verify-otp",
        query,
      });
    } else {
      setNotification({
        text: "Error when send OTP.",
        type: "error",
      });
    }
    setIsShowLoading(false);
  };

  const onCheckinCheckoutRequest = async () => {
    setIsShowLoading(true);
    if (!location) {
      setNotification({
        text: "Cannot get location information. Please refresh page and allow access location service.",
        type: "error",
      });
      setIsShowLoading(false);
      return Promise.resolve();
    }
    const options = {
      method: "POST",
      body: JSON.stringify({
        type: "checkin",
        latitude: location?.latitude,
        longitude: location?.longitude,
      }),
      headers: {
        "X-Openerp-Session-Id": appStorage.sessionId,
      },
    };
    const responseData = await sendRequest(
      `private/employee_checkin_checkout?X-Openerp-Session-Id=${appStorage.sessionId}`,
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
        pathname: "/checkin-checkout/checkin/confirm",
        query: {
          ...query,
          ...{ latitude: location.latitude, longitude: location.longitude },
        },
      });
    }
  };

  const onSubmit = useCallback(
    (values: CheckinCheckoutForm) => {
      const {} = watch();

      if (appStorage.sessionId) {
        onCheckinCheckoutRequest();
      } else {
        if (!query.phone_number || !asPath.includes("phone_number=+")) {
          setNotification({
            text: "Missing Phone number",
            type: "error",
          });
          return;
        }
        sendOtp();
      }
    },
    [
      appStorage,
      asPath,
      onCheckinCheckoutRequest,
      query.phone_number,
      sendOtp,
      setStorage,
      watch,
    ]
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    // If url also includes otp_code
    if (query?.otp_code && !submittedFlowOtp) {
      submittedFlowOtp = true;
      const searchString = window.location.search;
      push({
        pathname: "/checkin-checkout/checkin/verify-otp",
        query: searchString.replace("?", ""),
      });
    }
  }, [query]);

  return (
    <Suspense fallback={<Loading />}>
      {isShowLoading && (
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
      )}
      <ToastContainer
        notification={notification}
        setNotification={setNotification}
      />
      <CheckinView
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        watch={watch}
      />
    </Suspense>
  );
};

export default CheckinContainer;
