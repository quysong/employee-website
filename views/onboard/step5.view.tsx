import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import Icon from "components/Icon";
import { useRouter } from "next/router";
import {
  ColumnCenter,
  RowCenter,
  Step5TextFont16,
  Step5Title,
  TitleSmall,
  ViewBox,
  Wrapper
} from "./onboard.style";

interface Step5Props {
  reload: () => void;
  firstName: string | string[] | undefined;
  [x: string]: any;
}

const Step5 = ({reload, firstName}: Step5Props) => {
  return (
    <Wrapper>
      <ViewBox>
        <Step5Title style={{ marginBottom: "54px" }}>
          Verification Complete!
        </Step5Title>
        <NormalCard>
          <ColumnCenter>
            <Icon name="success-icon" alt="success icon" />
            <TitleSmall>Congratulations {firstName}!</TitleSmall>
            <Step5TextFont16>
              You profile information has been submitted.
            </Step5TextFont16>
          </ColumnCenter>
        </NormalCard>
        <RowCenter style={{ marginTop: "28px" }}>
          <NormalButton onClick={reload}>Request Leave</NormalButton>
        </RowCenter>
      </ViewBox>
    </Wrapper>
  );
};

export default Step5;
