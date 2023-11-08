import { ViewBox } from "views/leave/leave.style";
import { HolidayItem, HolidayItemName, HolidayItemTop, HolidayItemType, HolidayTodayItem, HolidaysWrapper, PaddingWrapper, PageHeaderWrapper } from "./holidays.style";
import HeaderContainer from "containers/layout/header.container";
import { SVGIcon } from "components/svg-icon/Icon";
import { useRouter } from "next/router";

type HolidayProps = {
    [x: string]: any;
    data: any;
}

const HolidaysView:React.FC<HolidayProps> = ({data, isToday, renderDate, isTdayHolidays}) => {
  const { back } = useRouter();

  return (
      <ViewBox style={{padding: 0}}>
            <PaddingWrapper>
                <HeaderContainer/>
            </PaddingWrapper>
            <PageHeaderWrapper>
                <SVGIcon name="chevron" size={24} 
                    style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
                    onClick={back}
                />
                <p>Holidays</p>
                <p/>
            </PageHeaderWrapper>
            <HolidaysWrapper>
                {
                    data.map((item: any) => (
                        isToday(item?.date) ?
                            isTdayHolidays(item) ?
                                <HolidayTodayItem>
                                    <HolidayItemType>{item?.type}</HolidayItemType>
                                    <HolidayItemTop>
                                        <HolidayItemName color="#CE5C63">{item?.name}</HolidayItemName>
                                        <HolidayItemType>Today</HolidayItemType>
                                    </HolidayItemTop>
                                </HolidayTodayItem>
                                :
                                <HolidayItem type="today">
                                    <HolidayItemTop>
                                        <HolidayItemName>{renderDate()}</HolidayItemName>
                                        <HolidayItemType>Today</HolidayItemType>
                                    </HolidayItemTop>
                                </HolidayItem>
                            :
                            <HolidayItem>
                                <HolidayItemTop>
                                    <HolidayItemName>{renderDate(item?.date)}</HolidayItemName>
                                    <HolidayItemType>{item?.type}</HolidayItemType>
                                </HolidayItemTop>
                                <HolidayItemName>{item?.name}</HolidayItemName>
                            </HolidayItem>
                    ))
                }

                
            </HolidaysWrapper>
      </ViewBox>
  )
}

export default HolidaysView;
