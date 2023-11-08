import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import InputField from "components/input-field";
import { Step1Props } from "interfaces/onboard.interface";
import {
  ErrorText,
  RowCenter,
  RowGap,
  TextFont14,
  TitleSmallExtend,
  ViewBox,
  Wrapper
} from "./onboard.style";

const Step1 = ({
  t,
  formRef,
  values,
  onChangeValues,
  onSubmitStep1,
  errors,
}: Step1Props) => {  
  return (
    <>
      <Wrapper>
        <ViewBox>
          <NormalCard>
            <TitleSmallExtend>{t("step1CardTitle")}</TitleSmallExtend>
            <TextFont14>{t("step1SubTitle")}</TextFont14>
            <form ref={formRef}>
              <RowGap
                gap={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <InputField
                  styleWrapper={{
                    width: "64px",
                  }}
                  name={"day"} 
                  placeHolder={"01"}
                  label={t("day")}
                  tabIndex={1}
                  errorMessage={errors?.day}
                  inputmode="numeric"
                  type="number" 
                  pattern="[0-9]*" 
                  value={values.day}
                  onChange={(e)=> onChangeValues(e.target.value, 'day')}
                />
                 <InputField
                  styleWrapper={{
                    width: "64px",
                  }}
                  name={"month"} 
                  placeHolder={"01"}
                  label={t("month")}
                  tabIndex={2}
                  errorMessage={errors?.month}
                  inputmode="numeric"
                  type="number" 
                  pattern="[0-9]*" 
                  value={values.month}
                  onChange={(e)=> onChangeValues(e.target.value, 'month')}
                />
                <InputField
                  styleWrapper={{
                    width: "105px",
                  }}
                  name={"year"} 
                  placeHolder={"2000"}
                  label={t("year")}
                  tabIndex={3}
                  errorMessage={errors?.year}
                  inputmode="numeric"
                  type="number" 
                  pattern="[0-9]*" 
                  value={values.year}
                  onChange={(e)=> onChangeValues(e.target.value, 'year')}
                />  
              </RowGap>
            </form>
            {errors?.step1Error && <ErrorText>{errors?.step1Error}</ErrorText>}
          </NormalCard>
          <RowCenter marginTop={32}>
            <NormalButton onClick={onSubmitStep1}>Continue</NormalButton>
          </RowCenter>
        </ViewBox>
      </Wrapper>
      {/* {
        currentFocusInput && 
          <ContainerNumber>
            <NumberKeyBoard onClick={onClickNumber} setCurrentFocusInput={setCurrentFocusInput}/>
          </ContainerNumber>
      } */}
    </>
  );
};

export default Step1;
