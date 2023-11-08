import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import InputOTPField from "components/input-otp-field";
import HeaderContainer from "containers/layout/header.container";
import { useRouter } from "next/router";
import {
  CenterElementWrapper,
  ErrorMessage,
  FormWrapper,
  ResendOTPWrapper,
  HeadText,
  TitleSmallExtend,
  HeadTextSpan,
  ViewBox,
  Wrapper,
  Title,
} from "./verify-otp.style";

interface VerifyOtpViewProps {
  [x: string]: any;
  phoneNumber?: string | string[];
  onClickNumber?: (value: string, e?: React.MouseEvent<HTMLDivElement>) => void;
  setCurrentFocusInput?: (value: number | null) => void;
  currentFocusInput?: number | null;
}

const VerifyOtpView = ({
  phoneNumber,
  firstName,
  onSubmit,
  handleSubmit,
  setValue,
  errorMessage,
  resendOtp,
  count,
  t
}: VerifyOtpViewProps) => {
  return (
    <Wrapper>
      <ViewBox>
        <HeaderContainer />
        <HeadText>
          {t("title")} <HeadTextSpan> {firstName}!</HeadTextSpan>
        </HeadText>
        <Title>Login Verification</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NormalCard>
            <TitleSmallExtend>
              Code is sent to {`+${phoneNumber?.toString().trim()}`}
            </TitleSmallExtend>
            <FormWrapper>
              <InputOTPField
                name="otp"
                onChange={(curr: string) => setValue("otp", curr)}
                isError={errorMessage}
              />
              {errorMessage ? (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              ) : null}
            </FormWrapper>
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
          </NormalCard>
          <CenterElementWrapper margin="40px 0 0">
            <NormalButton buttonType="submit">Verify</NormalButton>
          </CenterElementWrapper>
        </form>
      </ViewBox>
    </Wrapper>
  );
};

export default VerifyOtpView;
