import { MIXIN_SCREEN } from "constants/style";
import HolidaysContainer from "containers/holidays/holidays.container";
import styled from "styled-components";

const ContainerBox = styled.div`
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
  overflow: auto;
  height: 100vh;
  @media (max-width: ${MIXIN_SCREEN.smallScreen}) {
    background-size: 100%;
  }
`;

const Holidays = () => {
  return (
    <ContainerBox>
      <Wrapper>
        <HolidaysContainer/>
      </Wrapper>
    </ContainerBox>
  )
}

export default Holidays;
