import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import InputField from "components/input-field";
import TakePhoto from "components/take-photo";
import { MIXIN_SCREEN } from "constants/style";
import { Step2Props } from "interfaces/onboard.interface";
import {
  RowCenter,
  TextFont14,
  TitleSmallExtend,
  ViewBox,
  Wrapper,
} from "./onboard.style";

const styleCard = `
  margin-bottom: 32px;
  @media (${MIXIN_SCREEN.smallHeight}) {
    margin-bottom: 16px;
  }
`;

const Step2 = ({
  onOpenCamera,
  objectUrlImage,
  errors,
  handleSubmit,
  onSubmit,
  register,
  onKeyUp,
  value,
  onChange,
}: Step2Props) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ViewBox>
          <NormalCard styles={styleCard}>
            <TitleSmallExtend>National I.D</TitleSmallExtend>
            <TextFont14>Type your 12 Digits ID number</TextFont14>
            <InputField
              placeHolder={"000 00 00 000000"}
              name={"cardId"}
              maxLength={15}
              register={register}
              onKeyUp={onKeyUp}
              errorMessage={errors.cardId?.message}
              validation={{
                required: "Please fill out this field!",
                minLength: {
                  value: 15,
                  message: "National I.D is invalid!",
                },
                pattern: {
                  value: /^[\d ]*$/,
                  message: "This field is number only!",
                },
              }}
              showError
              autoComplete="cardId"
              value={value}
              onChange={onChange}
            />
          </NormalCard>
          <TakePhoto
            onOpenCamera={onOpenCamera}
            objectUrlImage={objectUrlImage}
            isError={!!errors.images?.message}
          />
          <RowCenter marginTop={32} style={{
            marginBottom: 82
          }}>
            <NormalButton buttonType="submit">Continue</NormalButton>
          </RowCenter>
        </ViewBox>
      </form>
    </Wrapper>
  );
};

export default Step2;
