import Loading from "components/loading";
import { sendRequest } from "helpers/api";
import { formatPhoneFromUrl } from "helpers/common";
import { getDifferenceBetween2Day, isDateValid, parseStringToDateWithFormat } from "helpers/date";
import useAppStorage from "hooks/useAppStorage";
import { LeaveForm } from "interfaces/leave.interface";
import { NotificationType } from "interfaces/notification.interface";
import { useRouter } from "next/router";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LeaveView from "../../views/leave/leave.view";
import BasicModal from "components/modal";
import ToastContainer from "containers/toast/toast.container";
import { SelectBoxTypes } from "interfaces/common.interface";

const days: any = Array.from(Array(31).keys()).map((ele) => {
  let item = ele + 1;
  return {
    key: `${item}`,
    value: item > 9 ? `${item}` : `0${item}`,
  };
});

const month: any = Array.from(Array(12).keys()).map((ele) => {
  let item = ele + 1;
  return {
    key: `${item}`,
    value: item > 9 ? `${item}` : `0${item}`,
  };
});

const currentYear = new Date().getFullYear();

const years: any = Array.from(Array(5).keys()).map((ele) => {
  let item = (currentYear + ele).toString();

  return {
    key: `${item}`,
    value: `${item}`,
  };
});



interface LeaveContainer { }
const LeaveContainer = (props: LeaveContainer) => {
  const { push, query, asPath } = useRouter();
  const [errorDate, setErrorDate] = useState<{
    from: string,
    to: string,
  }>({
    from: '',
    to: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    defaultValues: {
      leaveType: "",
      dateFromDay: days[0].key,
      dateFromMonth: month[0].key,
      dateFromYear: years[0].key,
      dateToDay: days[0].key,
      dateToMonth: month[0].key,
      dateToYear: years[0].key,
      comment: ""
    },
  });

  const { appStorage, setStorage } = useAppStorage();

  const [fileName, setFileName] = useState<string>();
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>({
    text: null,
    type: null
  });
  const [leaveTypes, setLeaveTypes] = useState<SelectBoxTypes[]>([]);

  const sendOtp = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ phone_number: formatPhoneFromUrl(query.phone_number as string) }),
      headers: {
      }
    }
    const responseData = await sendRequest('public/employee_otp/resend', options);
    if (responseData.status === 'success') {
      push({
        pathname: "/leave/verify-otp",
        query
      });
    } else {
      setNotification({
        text: "Error when send OTP.",
        type: 'error'
      });
    }
    setIsShowLoading(false)
  }

  const onLeaveRequest = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify(appStorage.leaveRequest),
      headers: {
        'X-Openerp-Session-Id': appStorage.sessionId
      },
    }
    const responseData = await sendRequest(`/private/employee_leave_request?X-Openerp-Session-Id=${appStorage.sessionId}`, options);
    if (responseData) {
      // TODO handle success request
      push({
        pathname: "/leave/attendance",
        query
      });
    }
  }

  const onSubmit = useCallback((values: LeaveForm) => {
    const { dateFromDay, dateToMonth, dateFromYear, dateToYear, dateFromMonth, dateToDay } = watch();
    let fromDate: any = `${dateFromYear}/${dateFromMonth}/${dateFromDay}`;
    let toDate: any = `${dateToYear}/${dateToMonth}/${dateToDay}`;

    setErrorDate({
      from: '',
      to: ''
    })

    if (isDateValid(fromDate)) {
      setErrorDate({
        ...errorDate,
        from: `Date ${fromDate} does not exist`
      })
    }

    if (isDateValid(toDate)) {
      setErrorDate({
        ...errorDate,
        to: `Date ${toDate} does not exist`
      })
    }
    console.log({toDate});
    
    console.log(isDateValid(toDate));

    console.log({errorDate});
    
    if (errorDate.from.length > 0 || errorDate.to.length > 0) return;

    setIsShowLoading(true);
    fromDate = parseStringToDateWithFormat(fromDate);
    toDate = parseStringToDateWithFormat(toDate);
    setStorage({
      ...appStorage,
      leaveRequest: {
        leave_type_id: values.leaveType,
        date_to: toDate,
        date_from: fromDate,
        description: values.comment
      }
    })
    if (appStorage.sessionId) {
      onLeaveRequest();
    } else {
      if (!query.phone_number || !asPath.includes('phone_number=+')) {
        setNotification({
          text: "Missing Phone number",
          type: 'error'
        });
        return;
      }
      sendOtp();
    }
  }, [appStorage, asPath, errorDate, onLeaveRequest, query.phone_number, sendOtp, setStorage, watch]);

  const [dayOff, setDayOff] = useState<number>(1);

  const onChangeDate = (event: any) => {

    const { dateFromDay, dateToMonth, dateFromYear, dateToYear, dateFromMonth, dateToDay } = watch();

    let fromDate: any = new Date(`${dateFromYear}/${dateFromMonth}/${dateFromDay}`);
    let toDate: any = new Date(`${dateToYear}/${dateToMonth}/${dateToDay}`);

    let objectDateFrom: any = {
      day: dateFromDay,
      month: dateFromMonth,
      year: dateFromYear,
    } 

    let objectDateTo: any = {
      day: dateToDay,
      month: dateToMonth,
      year: dateToYear,
    } 

    if (fromDate >= toDate) {
      switch (event.target.name) {
        case 'dateFromDay':
          setValue('dateToDay', dateFromDay);
          objectDateTo = {...objectDateTo, day: dateFromDay}
          break;
        case 'dateFromMonth':
          setValue('dateToMonth', dateFromMonth);
          objectDateTo = {...objectDateTo, month: dateFromMonth}
          if(dateFromYear === dateToYear){
            if(dateFromDay >= dateToDay){
              setValue('dateToDay', dateFromDay);
              objectDateTo = {...objectDateTo, day: dateToDay}
            }
          }
          break;
        case 'dateFromYear':
          setValue('dateToYear', dateFromYear);
          objectDateTo = {...objectDateTo, year: dateFromYear}
          if(dateFromYear === dateToYear){
            if(dateFromMonth > dateToMonth){
              setValue('dateFromMonth', dateToMonth);
              objectDateTo = {...objectDateTo, month: dateFromMonth}
              if(dateFromDay >= dateToDay){
                setValue('dateToDay', dateFromDay);
                objectDateTo = {...objectDateTo, day: dateFromDay}
              }
            }
          }
          break;
        case 'dateToDay':
          setValue('dateFromDay', dateToDay);
          objectDateFrom = {...objectDateFrom, day: dateToDay}
          break;
        case 'dateToMonth':
          setValue('dateFromMonth', dateToMonth);
          objectDateFrom = {...objectDateFrom, month: dateToMonth}
          if(dateFromYear === dateToYear){
            if(dateFromDay >= dateToDay){
              setValue('dateFromDay', dateToDay);
              objectDateFrom = {...objectDateFrom, day: dateToDay}
            }
          }
          break;
        case 'dateToYear':
          setValue('dateFromYear', dateToYear);
          objectDateFrom = {...objectDateFrom, year: dateToYear}
          if(dateFromYear === dateToYear){
            if(dateFromMonth > dateToMonth){
              setValue('dateFromMonth', dateToMonth);
              objectDateFrom = {...objectDateFrom, month: dateToMonth}
              if(dateFromDay >= dateToDay){
                setValue('dateFromDay', dateToDay);
                objectDateFrom = {...objectDateFrom, day: dateToDay}
              }
            }
          }
          break;
      }
      // setDayOff(1);
      // return;
      fromDate = new Date(`${objectDateFrom.year}/${objectDateFrom.month}/${objectDateFrom.day}`);
      toDate = new Date(`${objectDateTo.year}/${objectDateTo.month}/${objectDateTo.day}`);
    }
    
    setDayOff(getDifferenceBetween2Day(toDate, fromDate));
  }

  const onReset = () => {
    reset();
  }

  const onUploadData = (event: any) => {
    if (event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  }

  const getLeaveType = async () => {
    const options = {
      method: 'GET',
      headers: {}
    }
    const leaveTypeResponse = await sendRequest('public/employee_leave_type/', options) ?? [];
    const leaveTypes = leaveTypeResponse.map((ele: { id: number, name: string }) => {
      return {
        key: ele.id,
        value: ele.name
      }
    });
    setLeaveTypes([{
      key: "",
      value: "Select One",
      hidden: true,
      selected: true,
      disable: true
    }, ...leaveTypes]);
  }

  useEffect(() => {
    getLeaveType();
  }, [])

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
      <LeaveView
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        days={days}
        months={month}
        years={years}
        register={register}
        errors={errors}
        leaveTypes={leaveTypes}
        onChangeDate={onChangeDate}
        watch={watch}
        dayOff={dayOff}
        onReset={onReset}
        onUploadData={onUploadData}
        fileName={fileName}
        errorDate={errorDate}
      />
    </Suspense>
  );
};

export default LeaveContainer;
