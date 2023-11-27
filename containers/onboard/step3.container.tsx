import { sendRequest } from "helpers/api";
import {
  cleanObject,
  formatPhoneFromUrl,
  removeHeadBase64,
} from "helpers/common";
import { formatDateDMY } from "helpers/date";
import useTrans from "hooks/useTrans";
import { NotificationType } from "interfaces/notification.interface";
import { ValuesStep3Type } from "interfaces/onboard.interface";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Step3 from "views/onboard/step3.view";

interface Step3ContainerProps {
  [x: string]: any;
  setIndexSwipe: (index: number) => void;
  indexSwipe: number;
  setNotification: (value: NotificationType) => void;
  setIsShowLoading: (value: boolean) => void;
  isShowLoading: boolean;
}

const Step3Container = ({
  indexSwipe,
  setIndexSwipe,
  slides,
  setSlides,
  setNotification,
  setIsShowLoading,
  isShowLoading,
  setStorage,
  appStorage,
}: Step3ContainerProps) => {
  const { t } = useTrans();

  const {
    query: { phone_number, first_name, user_id },
    asPath,
  } = useRouter();

  const step3Data = appStorage?.onboard?.step3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      address: step3Data?.private_address_city || "",
      building: step3Data?.private_address_street || "",
      floor: step3Data?.private_address_street2 || "",
      email: step3Data?.private_email || "",
    },
  });

  const callApiUpdateProfile = async (sessionId: string) => {
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
        setNotification({
          text: resUpdateProfile.name,
          type: "error",
        });
      } else {
        setNotification({
          text: resUpdateProfile.description,
          type: "error",
        });
      }
    }
    setIsShowLoading(false);
  };

  const onSubmit = async (values: ValuesStep3Type) => {
    if (isShowLoading) return;
    if (!user_id && (!phone_number || !asPath.includes("phone_number=+"))) {
      setNotification({
        text: "Missing Phone number",
        type: "error",
      });
      return;
    }
    if (!first_name) {
      setNotification({
        text: "Missing first name",
        type: "error",
      });
      return;
    }
    setIsShowLoading(true);

    // If user_id param exists
    if (user_id) {
      setStorage({
        ...appStorage,
        onboard: {
          ...appStorage.onboard,
          step3: {
            name: first_name.toString().replaceAll("_", " "),
            private_phone_number: "",
            private_address_city: values.address,
            private_address_street: values.building,
            private_address_street2: values.floor,
            private_email: values.email,
          },
          focus: {
            index: 3,
            steps: { ...appStorage.onboard.focus.steps, step4: true },
          },
        },
        userInfo: {
          ...appStorage.userInfo,
          phoneNumber: "",
        },
      });
      setSlides({
        ...slides,
        step4: true,
      });
      setIndexSwipe(indexSwipe + 1);
      setIsShowLoading(false);
      return;
    }

    const options = {
      method: "POST",
      body: JSON.stringify({
        phone_number: formatPhoneFromUrl(phone_number as string),
      }),
    };

    const responseData = await sendRequest(
      "public/employee_otp/resend",
      options
    );
    if (responseData.status === "success") {
      setStorage({
        ...appStorage,
        onboard: {
          ...appStorage.onboard,
          step3: {
            name: first_name.toString().replaceAll("_", " "),
            private_phone_number: formatPhoneFromUrl(phone_number as string),
            private_address_city: values.address,
            private_address_street: values.building,
            private_address_street2: values.floor,
            private_email: values.email,
          },
          focus: {
            index: 3,
            steps: { ...appStorage.onboard.focus.steps, step4: true },
          },
        },
        userInfo: {
          ...appStorage.userInfo,
          phoneNumber: formatPhoneFromUrl(phone_number as string),
        },
      });
      setSlides({
        ...slides,
        step4: true,
      });
      setIndexSwipe(indexSwipe + 1);
      setIsShowLoading(false);
      return;
    } else {
      setNotification({
        text: responseData.description,
        type: "error",
      });
      setIsShowLoading(false);
    }
  };

  return (
    <Step3
      t={t}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
    />
  );
};

export default Step3Container;
