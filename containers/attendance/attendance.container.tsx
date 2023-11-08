import { ANNUAL_LEAVE_NAME, CASUAL_LEAVE_NAME } from "constants/common";
import { sendRequest } from "helpers/api";
import useAppStorage from "hooks/useAppStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AttendanceView from "views/attendance/attendance.view";

const AttendanceContainer = () => {
  const [summary, setSummary] = useState<any[]>();
  const {appStorage} = useAppStorage();
  const {push, query} = useRouter();
  
  const getSummary = async () => {
    const options = {
      method: 'GET',
      headers: {
        "X-Openerp-Session-Id": appStorage.sessionId
      }
    }
    const leaveTypeResponse = await sendRequest('private/employee_leave_request/', options) ?? [];
    if(leaveTypeResponse){
      setSummary(leaveTypeResponse?.filter((ele: any) => [ANNUAL_LEAVE_NAME, CASUAL_LEAVE_NAME].includes(ele.name)) || []);
    }
  }

  useEffect(()=> {
    if(appStorage.sessionId){
      getSummary();
      return;
    }
    push('/404', query);
  }, []);
  return <AttendanceView summary={summary}/>
}

export default AttendanceContainer; 
