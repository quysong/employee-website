import { MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";
import OnboardContainer from "../containers/onboard/onboard.container";

export const ContainerBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
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

export default function Onboarding() {
  return (
    <ContainerBox>
      <Wrapper>
        <OnboardContainer />
      </Wrapper>
    </ContainerBox>
  );
}
