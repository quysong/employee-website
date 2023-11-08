import { LEAVE_REQUEST_TYPE } from "constants/common";
import dayjs from "dayjs";
import useAppStorage from "hooks/useAppStorage";
import { sendRequest } from "helpers/api";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import AnnualLeaveHistoryView from "views/annual-leave-history/annual-leave-history.view";
import Loading from "components/loading";
import BasicModal from "components/modal";

import isoWeek from "dayjs/plugin/isoWeek";

const AnnualLeaveHistoryContainer = () => {
  dayjs.extend(isoWeek);

  const {query} = useRouter();
  const {appStorage} = useAppStorage();

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const getStatus = (state: string) => {
    return (LEAVE_REQUEST_TYPE as {[x: string]: string})[state];
  }

  const getLeaveRequest = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-Openerp-Session-Id": appStorage.sessionId
      }
    }

    const response = await sendRequest('private/employee_leave_request/', options);
    if(response.code === 401) return;

      const currentLeave = response?.find((item: any) => item.id == query.id) || {};
      
      //filter to get displayable item
      currentLeave.leave_requests = currentLeave.leave_requests.filter(((item: any) => {
        return Object.keys(LEAVE_REQUEST_TYPE).includes(item?.state);
      }))
      
      setData(currentLeave);
      setIsLoading(false);
  }

  const diffDate = (date1: string, date2: string) => {
    const tempDate1 = date1.split("/").reverse().join("/");
    const tempDate2 = date2.split("/").reverse().join("/");

    return dayjs(tempDate1).diff(tempDate2, "days");
  };


  const renderDate = (date: string) => {
    const temp = date.split("/").reverse().join("/");
    return dayjs(temp, "DD/MM/YYYY").format("ddd, D MMM");
  };

  const groupByDate = () => {
    const nextDayKey = "Next Days"
    const todayKey = `${dayjs().format("ddd, D MMM, YYYY")}`;
    const lastWeekKey = "Last Week";
    const lastMonthKey = "Last Month";
    const otherKey = "Other";
    console.log(data.leave_requests);
    
    return data.leave_requests?.reduce(
      (curr: any, item: any) => {
        const temp = item?.date_from?.split("/").reverse().join("/");

        if(dayjs(dayjs().format("YYYY/MM/DD")).diff(temp, "days") < 0)
          curr[nextDayKey] = [...curr[nextDayKey], item];
        else if (dayjs().diff(temp, "days") === 0)
          curr[todayKey] = [...curr[todayKey], item];
        else if (dayjs(temp).isoWeek() === dayjs().isoWeek() - 1)
          curr[lastWeekKey] = [...curr[lastWeekKey], item];
        else if (dayjs(temp).get("months") === dayjs().get("months") - 1)
          curr[lastMonthKey] = [...curr[lastMonthKey], item];
        else 
          curr[otherKey] = [...curr[otherKey], item];

        return curr;
      },
      { [nextDayKey]: [],[todayKey]: [], [lastWeekKey]: [], [lastMonthKey]: [], [otherKey]: [] }
    );
  };

  useEffect(()=> {
    if(query.id){
      getLeaveRequest();
    }
  }, [query.id])

  return (
    <Suspense fallback={<Loading/>}>
      {isLoading ? (
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
      <AnnualLeaveHistoryView 
            data={data} 
            getStatus={getStatus} 
            diffDate={diffDate}
            renderDate={renderDate}
            groupByDate={groupByDate}
          />
    </Suspense>
  )
}

export default AnnualLeaveHistoryContainer;
