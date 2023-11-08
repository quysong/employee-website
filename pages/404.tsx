import { MIXIN_SCREEN } from "constants/style";
import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: 'center';
`;

const Wrapper = styled.div`
  background-image: url("/images/background.png");
  width: 100%;
  max-width: ${MIXIN_SCREEN.smallScreen};
  background-repeat: no-repeat;
  background-origin: content-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${MIXIN_SCREEN.smallScreen}) {
    background-size: 100%;
  }
`;

export default function NotFound() {
    return (
      <ContainerBox>
      <Wrapper>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
      </Wrapper>
    </ContainerBox>
    );
}