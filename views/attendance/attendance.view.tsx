import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import Icon from "components/Icon";
import { SVGIcon } from "components/svg-icon/Icon";
import { ANNUAL_LEAVE_NAME, CASUAL_LEAVE_NAME } from "constants/common";
import HeaderContainer from "containers/layout/header.container";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ButtonTab,
  HrTag,
  ItemNodeProgressBar,
  PageHeaderWrapper,
  RowCenter,
  RowFlexEnd,
  RowSpaceBetween,
  TextCard,
  TextSpanBoldCard,
  TitleHeaderCard,
  ViewBox,
  ViewNodeProgressBar,
  ViewRowButton,
  WrapperContentCard,
  WrapperContents,
  WrapperHeaderCard,
} from "./attendance.style";

const AttendanceView = ({ summary }: any) => {
  const { push, back, query } = useRouter();
  const annualLeave = summary?.find(
    (ele: any) => ele.name === ANNUAL_LEAVE_NAME
  );
  const casualLeave = summary?.find(
    (ele: any) => ele.name === CASUAL_LEAVE_NAME
  );

  const annualLeaveSummary = annualLeave?.summary;
  const casualLeaveSummary = casualLeave?.summary;

  const annualLeavesTaken = parseInt(annualLeaveSummary?.leaves_taken || 0);
  const casualLeavesTaken = parseInt(casualLeaveSummary?.leaves_taken || 0);

  const annualVirtualLeavesTaken = parseInt(annualLeaveSummary?.virtual_leaves_taken || 0);
  const casualVirtualLeavesTaken = parseInt(casualLeaveSummary?.virtual_leaves_taken || 0);

  

  return (
    <ViewBox>
      <WrapperContents>
        <HeaderContainer />
      </WrapperContents>
      <PageHeaderWrapper>
        {/* <SVGIcon
          name="chevron"
          size={24}
          style={{ transform: "rotate(180deg)", cursor: "pointer" }}
          onClick={back}
        /> */}
        <div />
        <h2>Leave</h2>
        <div />
      </PageHeaderWrapper>
      <WrapperContents>
        <ViewRowButton>
          <ButtonTab active={true} onClick={() => {}}>
            Leave
          </ButtonTab>
          <ButtonTab>Overtime</ButtonTab>
          <ButtonTab onClick={() => push("/leave/holidays")}>
            Holidays
          </ButtonTab>
        </ViewRowButton>
      </WrapperContents>
      <HrTag
        style={{
          marginTop: 20,
          marginBottom: 20,
          border: "1px solid #FFD8D8",
        }}
      />
      <WrapperContents>
        {annualLeave && (
          <NormalCard
            styles={`
          padding: 0;
        `}
          >
            <WrapperHeaderCard>
              <RowFlexEnd>
                <Link href={`/leave/annual-leave-history?id=${annualLeave?.id}`}>
                  <Icon name="next-icons" />
                </Link>
              </RowFlexEnd>
              <TitleHeaderCard>Annual Leave</TitleHeaderCard>
            </WrapperHeaderCard>
            <HrTag
              style={{
                border: "1px solid #C7029A",
                marginTop: 16,
              }}
            />
            <WrapperContentCard>
              <RowSpaceBetween
                style={{
                  margin: "16px 0",
                }}
              >
                <TextCard>
                  {" "}
                  Allowance : {annualLeaveSummary?.max_leaves || 0} Days{" "}
                </TextCard>
                <TextCard> Used : {annualLeavesTaken} Days </TextCard>
              </RowSpaceBetween>
              <ViewNodeProgressBar>
                {Array.from(
                  Array(parseInt(annualLeaveSummary?.max_leaves || "12")).keys()
                ).map((ele) => {
                  if (ele <= 4) {
                    return (
                      <ItemNodeProgressBar
                        key={ele}
                        color={
                          annualVirtualLeavesTaken >= ele + 1 ? "#909090" : "#FFD8D8"
                        }
                      />
                    );
                  }
                  if (ele > 4) {
                    return (
                      <ItemNodeProgressBar
                        key={ele}
                        color={
                          annualVirtualLeavesTaken >= ele + 1 ? "#00DD99" : "#FFD8D8"
                        }
                      />
                    );
                  }
                  return <ItemNodeProgressBar key={ele} />;
                })}
              </ViewNodeProgressBar>
              <RowSpaceBetween
                style={{
                  margin: "16px 0",
                }}
              >
                <TextCard>
                  {" "}
                  Remaining :{" "}
                  <TextSpanBoldCard>
                    {" "}
                    {annualLeaveSummary?.virtual_remaining_leaves || 0} Days{" "}
                  </TextSpanBoldCard>{" "}
                </TextCard>
                <TextCard>
                  {" "}
                  Pending{" "}
                  <TextSpanBoldCard>
                    {" "}
                    {annualLeaveSummary?.confirm || 0} Days{" "}
                  </TextSpanBoldCard>{" "}
                </TextCard>
              </RowSpaceBetween>
            </WrapperContentCard>
          </NormalCard>
        )}
        {casualLeaveSummary?.max_leaves && (
          <NormalCard
            styles={`
          padding: 0;
          background: #FF8D02;
          box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.24);
          margin-top: 25px;
        `}
          >
            <WrapperHeaderCard>
              <RowFlexEnd>
                <Link href={`/leave/annual-leave-history?id=${casualLeave?.id}`}>
                  <Icon name="next-icons" />
                </Link>
              </RowFlexEnd>
              <TitleHeaderCard>Apply Leave</TitleHeaderCard>
            </WrapperHeaderCard>
            <HrTag
              style={{
                border: "1px solid #C7029A",
                marginTop: 16,
              }}
            />
            <WrapperContentCard>
              <RowSpaceBetween
                style={{
                  margin: "16px 0",
                }}
              >
                <TextCard>
                  {" "}
                  Allowance : {casualLeaveSummary?.max_leaves || 0} Days{" "}
                </TextCard>
                <TextCard> Used : {casualLeavesTaken} Days </TextCard>
              </RowSpaceBetween>
              <ViewNodeProgressBar>
                {Array.from(
                  Array(parseInt(casualLeaveSummary?.max_leaves || "12")).keys()
                ).map((ele) => {
                  if (ele <= 4) {
                    return (
                      <ItemNodeProgressBar
                        key={ele}
                        color={
                          casualVirtualLeavesTaken >= ele + 1 ? "#909090" : "#FFD8D8"
                        }
                      />
                    );
                  }
                  if (ele > 4) {
                    return (
                      <ItemNodeProgressBar
                        key={ele}
                        color={
                          casualVirtualLeavesTaken >= ele + 1 ? "#00DD99" : "#FFD8D8"
                        }
                      />
                    );
                  }
                  return <ItemNodeProgressBar key={ele} />;
                })}
              </ViewNodeProgressBar>
              <RowSpaceBetween
                style={{
                  margin: "16px 0",
                }}
              >
                <TextCard>
                  {" "}
                  Remaining :{" "}
                  <TextSpanBoldCard>
                    {" "}
                    {casualLeaveSummary?.virtual_remaining_leaves || 0} Days{" "}
                  </TextSpanBoldCard>{" "}
                </TextCard>
                <TextCard>
                  {" "}
                  Pending{" "}
                  <TextSpanBoldCard>
                    {" "}
                    {casualLeaveSummary?.confirm || 0} Days{" "}
                  </TextSpanBoldCard>{" "}
                </TextCard>
              </RowSpaceBetween>
            </WrapperContentCard>
          </NormalCard>
        )}

        <RowCenter
          style={{
            marginTop: 27,
          }}
        >
          <NormalButton onClick={()=> {
            push({
              pathname: "/leave",
              query
            });
          }}>Apply Leave</NormalButton>
        </RowCenter>
      </WrapperContents>
    </ViewBox>
  );
};

export default AttendanceView;
