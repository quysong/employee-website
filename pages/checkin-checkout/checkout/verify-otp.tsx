import { MIXIN_SCREEN } from "constants/style";
import VerifyOtpContainer from "containers/checkin-checkout/checkout/verify-otp.container";
import styled from "styled-components";


const ContainerBox = styled.div`
display: flex;
justify-content: center;
`;

const Wrapper = styled.div`
overflow-y: auto;
height: 100vh;
background-image: url("/images/background.png");
width: 100%;
max-width: ${MIXIN_SCREEN.smallScreen};
background-repeat: no-repeat;
background-origin: content-box;
min-height: 100vh;
@media (max-width: ${MIXIN_SCREEN.smallScreen}) {
  background-size: 100%;
}
`;

const VerifyOtp = () => {
  return (
    <ContainerBox>
    <Wrapper>
        <VerifyOtpContainer/>
    </Wrapper>
  </ContainerBox>
  )
}

export default VerifyOtp;
