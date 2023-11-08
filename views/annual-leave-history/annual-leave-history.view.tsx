import React from "react";
import { SVGIcon } from "components/svg-icon/Icon";
import {
  BottomText,
  HistoryItem,
  HistoryItemBottom,
  HistoryItemTop,
  HistoryItemWrapper,
  HistoryStatus,
  HistoryWrapper,
  PaddingWrapper,
  SpaceBetweenWrapper,
  TextBold,
  TimeLineTitle,
  TitleText,
} from "./annual-leave-history.style";
import { GLOBAL_COLOR } from "constants/style";
import { ViewBox } from "views/onboard/onboard.style";
import HeaderContainer from "containers/layout/header.container";
import { PageHeaderWrapper } from "views/holidays/holidays.style";
import { useRouter } from "next/router";
import { LEAVE_REQUEST_TYPE } from "constants/common";

type AnnualLeaveHistoryViewType = {
  [x: string]: any;
  data: any;
  getStatus: (state: string) => string;
};

const AnnualLeaveHistoryView: React.FC<AnnualLeaveHistoryViewType> = ({
  data,
  getStatus,
  diffDate,
  renderDate,
  groupByDate,
}) => {
  const { back } = useRouter();

  const renderStatus = (status: string) => {
    switch (status) {
      case LEAVE_REQUEST_TYPE.refuse:
        return (
          <HistoryStatus type={status}>
            <SVGIcon
              name="check-square"
              color={GLOBAL_COLOR.whiteColor}
              size={24}
            />{" "}
            {status}
          </HistoryStatus>
        );
      case LEAVE_REQUEST_TYPE.validate:
        return (
          <HistoryStatus type={status}>
            <SVGIcon
              name="x-square"
              color={GLOBAL_COLOR.defaultColor}
              size={24}
            />{" "}
            {status}
          </HistoryStatus>
        );
      default:
        return <HistoryStatus type={status}>{status}</HistoryStatus>;
    }
  };

  return (
    <ViewBox style={{ padding: "0" }}>
      <PaddingWrapper>
        <HeaderContainer />
      </PaddingWrapper>
      <PageHeaderWrapper>
        <SVGIcon
          name="chevron"
          size={24}
          style={{ transform: "rotate(180deg)", cursor: "pointer" }}
          onClick={back}
        />
        <p>{data?.name} History</p>
        <p />
      </PageHeaderWrapper>
      <HistoryWrapper>
        {Object.entries(groupByDate() || {}).map(([item1, item2]: any, index: number) => (
          <React.Fragment key={`group-by-date-${index}`}>
            {item2.length ? (
              <>
                <TimeLineTitle>
                  {index === 1 ? <TextBold>Today </TextBold>: null}
                  {item1}
                </TimeLineTitle>
                {item2.map((item: any, idx: number) => {
                  const diffDateCount = diffDate(
                    item?.date_to,
                    item?.date_from
                  ) + 1;
                  return (
                    <HistoryItemWrapper key={`history-${idx}`}>
                      <HistoryItem type={getStatus(item.state)}>
                        <HistoryItemTop>
                          <TitleText>{renderDate(item?.date_from)}</TitleText>
                          {renderStatus(getStatus(item.state))}
                        </HistoryItemTop>

                        <HistoryItemBottom>
                          <BottomText>
                            {diffDateCount} Full Day Application
                          </BottomText>
                          <SpaceBetweenWrapper>
                            {diffDateCount === 1 ? (
                              <BottomText>8:00 AM to 6:00 PM</BottomText>
                            ) : (
                              <>
                                <TitleText style={{ fontSize: 14 }}>
                                  {renderDate(item?.date_from)}
                                </TitleText>
                                <BottomText>&nbsp;to&nbsp;</BottomText>
                                <TitleText style={{ fontSize: 14 }}>
                                  {renderDate(item?.date_to)}
                                </TitleText>
                              </>
                            )}
                          </SpaceBetweenWrapper>
                        </HistoryItemBottom>
                      </HistoryItem>
                    </HistoryItemWrapper>
                  );
                })}
              </>
            ) : null}
          </React.Fragment>
        ))}

        {/* <HistoryItemWrapper>
              <TimeLineTitle>Last Week</TimeLineTitle>
              <HistoryItem type={type3}>
                  <HistoryItemTop>
                    <TitleText>Mon, 13 Feb</TitleText>
                    <HistoryStatus type={type3}><SVGIcon name="x-square" color="white" size={24}/>Declined</HistoryStatus>
                  </HistoryItemTop>

                  <HistoryItemBottom>
                        <BottomText>1 Full Day Application</BottomText>
                        <SpaceBetweenWrapper>
                            <BottomText>8:00 AM to 6:00 PM</BottomText>
                            <SVGIcon name="chevron" size={24} color="#606060"/>
                        </SpaceBetweenWrapper>
                  </HistoryItemBottom>
              </HistoryItem>
          </HistoryItemWrapper>
          
          <HistoryItemWrapper>
              <TimeLineTitle>Last Week</TimeLineTitle>
              <HistoryItem type={type}>
                  <HistoryItemTop>
                    <TitleText>Mon, 13 Feb</TitleText>
                    <HistoryStatus type={type}><SVGIcon name="check-square" color={GLOBAL_COLOR.defaultColor} size={24}/>Approved</HistoryStatus>
                  </HistoryItemTop>

                  <HistoryItemBottom>
                        <BottomText>1 Full Day Application</BottomText>
                        <SpaceBetweenWrapper>
                            <BottomText>8:00 AM to 6:00 PM</BottomText>
                            <SVGIcon name="chevron" size={24} color="white"/>
                        </SpaceBetweenWrapper>
                  </HistoryItemBottom>
              </HistoryItem>
          </HistoryItemWrapper> */}
      </HistoryWrapper>
    </ViewBox>
  );
};

export default AnnualLeaveHistoryView;
