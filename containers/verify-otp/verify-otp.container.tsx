import Loading from "components/loading";
import ToastContainer from "containers/toast/toast.container";
import { sendRequest } from "helpers/api";
import { formatPhoneFromUrl } from "helpers/common";
import useAppStorage from "hooks/useAppStorage";
import useTrans from "hooks/useTrans";
import { NotificationType } from "interfaces/notification.interface";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import VerifyOtpView from "views/verify-otp/verify-otp.view";
import BasicModal from "components/modal";

const VerifyOtpContainer = () => {
  const {appStorage, setStorage} = useAppStorage();

  const { t } = useTrans();
  const {
    query,
  } = useRouter();
  const {
    formState: { errors, submitCount, isSubmitted, isValid },
    setValue,
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm();

  const [count, { startCountdown, resetCountdown }] =
  useCountdown({
    countStart: 61,
    intervalMs: 1000,
  })

  const { otp } = watch();
  const {push} = useRouter();
 
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>({
    text: null,
    type: null
  });

  useEffect(() => {
    if (otp?.length === 6) {
      clearErrors("otp");
      return;
    }
    setValue("otp", "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, otp]);

  useEffect(()=> {
    if(appStorage.sessionId){
      push({
        pathname: "/leave/attendance",
        query
      });
    }
  }, [appStorage]);

  const onLeaveRequest = async (sessionId: string | null) => {
    const options = {
      method: "POST",
      body: JSON.stringify(appStorage.leaveRequest),
      headers: {
        'X-Openerp-Session-Id': sessionId
      },
    }
    const responseData = await sendRequest(`/private/employee_leave_request?X-Openerp-Session-Id=${sessionId}`, options);
    if(responseData){
      // handle success request
      push({
        pathname: "/leave/attendance",
        query
      });
    }
  }

  const onSubmit = async (values: { otp: string | any[]; }, event: any) => {
    if (values?.otp.length < 6) {
      setError("otp", {
        message: "The number code is wrong",
        type: "required",
      });
      return;
    }
    setIsShowLoading(true);
    const options = {
      method: "POST",
      body: JSON.stringify({phone_number: formatPhoneFromUrl(query.phone_number as string), otp_code: values?.otp})
      
    }

    const responseData = await sendRequest('public/employee_otp/auth', options);
    console.log(responseData);
    
    if(responseData.session && responseData.session?.sid){
      //TODO call api submit dataa
      setStorage({
        ...appStorage, 
        sessionId: responseData.session?.sid ,
      } as any)
      onLeaveRequest(responseData?.session?.sid || null)
    } else {
      setNotification({
        text: responseData.description,
        type: 'error'
      })
    }
    
    setIsShowLoading(false);
  };

  const resendOtp = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({phone_number: formatPhoneFromUrl(query.phone_number as string)}),
      headers: {
      }
    }
    
    const responseData = await sendRequest('public/employee_otp/resend', options)
    if(responseData.status === 'success'){
      resetCountdown();
      startCountdown();
     
      return;
    }else {
     
    }
  }

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
    />
    </Suspense>
  )
}

export default VerifyOtpContainer;
