import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import InputOTPField from "components/input-otp-field";
import {
  CenterElementWrapper,
  ErrorMessage,
  FormWrapper,
  ResendOTPWrapper,
  TitleSmallExtend,
  ViewBox,
  Wrapper,
} from "./onboard.style";

interface Step4Props {
  [x: string]: any;
  phoneNumber?: string | string[];
  onClickNumber?: (value: string, e?: React.MouseEvent<HTMLDivElement>) => void;
  setCurrentFocusInput?: (value: number | null) => void;
  currentFocusInput?: number | null;
  initialValue?: string;
}

const Step4 = ({
  phoneNumber,
  onSubmit,
  handleSubmit,
  setValue,
  errorMessage,
  resendOtp,
  count,
  refOtp,
  initialValue,
}: Step4Props) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ViewBox>
          <NormalCard>
            <TitleSmallExtend>
              Code is sent to{" "}
              {phoneNumber ? `+${phoneNumber?.toString().trim()}` : "zalo app"}
            </TitleSmallExtend>
            <FormWrapper>
              <InputOTPField
                name="otp"
                onChange={(curr: string) => setValue("otp", curr)}
                isError={errorMessage}
                refOtp={refOtp}
                initialValue={initialValue}
              />
              {errorMessage ? (
                <ErrorMessage
                  style={{ textAlign: "center" }}
                  dangerouslySetInnerHTML={{ __html: errorMessage }}
                ></ErrorMessage>
              ) : null}
            </FormWrapper>
            {phoneNumber ? (
              <ResendOTPWrapper>
                Didn’t receive code?&nbsp;
                {count === 61 || count === 0 ? (
                  <TitleSmallExtend
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={resendOtp}
                  >
                    Request again.
                  </TitleSmallExtend>
                ) : (
                  <TitleSmallExtend
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Request again ({count}s).
                  </TitleSmallExtend>
                )}
              </ResendOTPWrapper>
            ) : null}
          </NormalCard>
          <CenterElementWrapper margin="40px 0 0">
            <NormalButton buttonType="submit">Verify</NormalButton>
          </CenterElementWrapper>
        </ViewBox>
      </form>
    </Wrapper>
  );
};

export default Step4;
