import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import SelectBoxField from "components/select-box-field";
import TextArea from "components/text-area";
import HeaderContainer from "containers/layout/header.container";
import { SelectBoxTypes } from "interfaces/common.interface";
import { LeaveForm } from "interfaces/leave.interface";
import { UseFormRegister } from "react-hook-form";
import { RowCenter } from "views/onboard/onboard.style";
import {
  BoxTempView,
  BoxViewLabelView,
  BtnClear,
  ErrorText,
  InputFile,
  Label,
  RowHead,
  SpanChooseFile,
  Text,
  TextSpan,
  Title,
  TitleCard,
  ViewBox,
  ViewTextChooseFile,
  WrapperFileInput
} from "./leave.style";


interface LeaveProps {
  days: any[];
  months: any[];
  years: any[];
  onSubmit: any;
  handleSubmit: any;
  register: UseFormRegister<LeaveForm>;
  errors: any;
  leaveTypes: SelectBoxTypes[];
  [x: string]: any;
  onUploadData: any;
}
const LeaveView: React.FC<LeaveProps> = ({
  months, days, years,
  handleSubmit, onSubmit,
  register, errors,
  leaveTypes,
  onChangeDate,
  dayOff,
  onReset,
  onUploadData,
  fileName,
  errorDate
}) => {

  const renderFromError = () => {
    if(errorDate.from){
      return  (
        <RowHead> 
          <ErrorText>
            {errorDate.from}
          </ErrorText>
        </RowHead>
      )
    }
    return null;
  }

  const renderToError = () => {
    if(errorDate.to){
      return  (
        <RowHead> 
        <ErrorText>
        {errorDate.to}
        </ErrorText>
      </RowHead>
      )
    }
    return null;
  }

  return (
    <ViewBox>
      <HeaderContainer />
      <Title
        style={{
          textAlign: "center",
        }}
      >
        Leave Request
      </Title>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

        <NormalCard
          styles={`
        padding: '17px 29px 32px 17px' 
      `}
        >
          <RowHead
            style={{
              alignItems: "center",
            }}
          >
            <TitleCard>Apply Leave</TitleCard>
            <BtnClear onClick={onReset}>Clear</BtnClear>
          </RowHead>
          <RowHead
            style={{
              marginTop: 29,
            }}
          >
            <Label>Leave Type</Label>
            <SelectBoxField
              styles={{
                minWidth: 180,
                textAlign: "unset",
              }}
              name="leaveType"
              options={leaveTypes}
              register={register}
              validation={{ required: "Please fill out this field" }}
              errorMessage={errors.leaveType?.message}
            />
          </RowHead>
          <RowHead
            style={{
              marginTop: 9,
            }}
          >
            <div>
              <BoxTempView />
              <BoxViewLabelView>
                <Label>From</Label>
              </BoxViewLabelView>
            </div>
            <div>
            <RowHead
              style={{
                gap: 13,
              }}
            >
              <SelectBoxField
                name="dateFromDay"
                options={days}
                label="Day"
                register={register}
                errorMessage={errors.dateFromDay?.message}
                validation={{ required: "Please fill out this field" }}
                onChange={onChangeDate}
              />
              <SelectBoxField
                name="dateFromMonth"
                label="Month"
                options={months}
                register={register}
                errorMessage={errors.dateFromMonth?.message}
                validation={{ required: "Please fill out this field" }}
                onChange={onChangeDate}
              />
              <SelectBoxField
                name="dateFromYear"
                label="Year"
                register={register}
                options={years}
                errorMessage={errors.dateFromYear?.message}
                validation={{ required: "Please fill out this field" }}
                onChange={onChangeDate}
              />
            </RowHead>
            {renderFromError()}
           
            </div>
          </RowHead>
          <RowHead
            style={{
              marginTop: 9,
            }}
          >
            <div>
              <BoxTempView />
              <BoxViewLabelView>
                <Label>To</Label>
              </BoxViewLabelView>
            </div>
            <div>
             <RowHead  style={{
                gap: 13,
              }}>
             <SelectBoxField
                name="dateToDay"
                options={days}
                label="Day"
                register={register}
                errorMessage={errors.dateToDay?.message}
                validation={{ required: "Please fill out this field" }}
                onChange={onChangeDate}
              />
              <SelectBoxField
                name="dateToMonth"
                label="Month"
                options={months}
                register={register}
                errorMessage={errors.dateToMonth?.message}
                validation={{ required: "Please fill out this field" }}
                onChange={onChangeDate}
              />
              <SelectBoxField
                name="dateToYear"
                label="Year"
                register={register}
                options={years}
                errorMessage={errors.dateToYear?.message}
                validation={{ required: "Please fill out this field" }}
                onChange={onChangeDate}
              />
             </RowHead>
             
            {renderToError()}
             
            </div>
          </RowHead>
          <RowHead
            style={{
              marginTop: 30,
              alignItems: 'unset'
            }}
          >
            <Label style={{
              marginTop: 5
            }}>Comment</Label>
              <TextArea
                placeholder="Type your comment here."
                name={"comment"}
                register={register}
                errorMessage={errors.dateToYear?.message}
              />
          </RowHead>
          {/* <RowHead
            style={{
              marginTop: 15,
            }}
          >
            <div></div>
            <WrapperFileInput>
              <InputFile type="file" onChange={onUploadData} />
              <ViewTextChooseFile>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.2984 12.2411L12.3723 20.1673C10.215 22.3246 6.97955 22.5793 4.78001 20.3798C2.62269 18.2225 2.90307 15.0971 5.10261 12.8976L14.0124 3.98777C15.376 2.62414 17.5714 2.62414 18.935 3.98777C20.2986 5.3514 20.2986 7.54673 18.935 8.91036L9.86874 17.9766C9.18908 18.6563 8.08712 18.6563 7.40745 17.9766C6.72779 17.2969 6.72779 16.195 7.40745 15.5153L15.49 7.43274"
                    stroke="#FFD8D8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <SpanChooseFile>{fileName ?? 'Add Attachment (optional)'}</SpanChooseFile>
              </ViewTextChooseFile>
            </WrapperFileInput>
          </RowHead> */}
        </NormalCard>

        <Text>
          Total Leave Request <TextSpan>{dayOff} Days</TextSpan>
        </Text>
        <RowCenter
          style={{
            marginTop: 18,
          }}
        >
          <NormalButton buttonType="submit">Request</NormalButton>
        </RowCenter>
      </form>
    </ViewBox>
  );
};

export default LeaveView;
