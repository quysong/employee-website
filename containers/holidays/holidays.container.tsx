import dayjs from "dayjs";
import { sendRequest } from "helpers/api";
import React, { Suspense, useEffect, useState } from "react";
import HolidaysView from "views/holidays/holidays.view";
import BasicModal from "components/modal";
import Loading from "components/loading";

interface HolidaysContainerProps{

}

const HolidaysContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const isToday = (date: string) => {
        const tempDate = new Date(date?.split("/").reverse().join("/"));
        const today = dayjs();

        return dayjs(tempDate).diff(today, "days") === 0;
    }

    const getHolidays = async () => {
        setIsLoading(true);
        const options = {
            method: "GET",
          }
        const response = await sendRequest('public/holidays', options);

        const holidaysRes = response?.find((item: any) => item.year === dayjs().get("years")) || {};

        const newHolidays = holidaysRes.holidays?.reduce((curr: any, item: any) => {
            const currDate = item.date?.split("/").reverse().join("/");
            
            if (!isToday(item.date) && dayjs(currDate).isAfter(dayjs())) {
              curr = [...curr, { date: dayjs().toISOString() }, item];
            } else {
              curr.push(item);
            }
            return curr;
        }, [])

        setData(newHolidays || []);
        setIsLoading(false);
    }

    const renderDate = (date: string) => {
        let temp = "";
        if(date)
            temp = date.split("/").reverse().join("/");
        else
            temp = dayjs().toISOString();

        return dayjs(temp).format("ddd, D MMM");
    };

    const isTdayHolidays = (item: any) => {
        return item?.type && isToday(item?.date);
    }

    useEffect(()=> {
        getHolidays();
    }, [])
    
    return (
        <Suspense>
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
            <HolidaysView
                data={data}
                isToday={isToday}
                renderDate={renderDate}
                isTdayHolidays={isTdayHolidays}
                />
        </Suspense>
    )
}

export default HolidaysContainer;