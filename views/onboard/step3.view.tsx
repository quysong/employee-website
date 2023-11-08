import NormalButton from "components/button/submit";
import NormalCard from "components/card";
import InputField from "components/input-field";
import { emailRegex } from "constants/common";
import { FONT_SIZE } from "constants/style";
import { Step3Props } from "interfaces/onboard.interface";
import {
  CenterElementWrapper,
  FormWrapper,
  OptionalEmailWrapper,
  TitleSmallExtend,
  ViewBox,
  Wrapper,
} from "./onboard.style";

const Step3 = ({ t, errors, handleSubmit, onSubmit, register }: Step3Props) => {
  return (
    <Wrapper>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <ViewBox>
          <NormalCard>
            <TitleSmallExtend>Your Address</TitleSmallExtend>
            <FormWrapper>
              <InputField
                placeHolder={"City/District/Ward"}
                role="presentation"
                name={"address"}
                register={register}
                errorMessage={errors.address?.message}
                validation={{ required: "Please fill out this field" }}
                showError
              />
              <InputField
                placeHolder={"Street/Building Name"}
                role="presentation"
                name={"building"}
                register={register}
                errorMessage={errors.building?.message}
                validation={{ required: "Please fill out this field" }}
                showError
              />
              <InputField
                placeHolder={"Unit/Floor"}
                role="presentation"
                name={"floor"}
                register={register}
                errorMessage={errors.floor?.message}
                validation={{ required: "Please fill out this field" }}
                showError
              />
            </FormWrapper>
          </NormalCard>
          <OptionalEmailWrapper>
            <TitleSmallExtend>Personal Email (Optional)</TitleSmallExtend>
            <InputField
              placeHolder={"sample@email.com"}
              name={"email"}
              role="presentation"
              outline
              register={register}
              errorMessage={errors.email?.message}
              validation={{
                pattern: {
                  value: emailRegex,
                  message: "Email is invalid!",
                },
              }}
              showError
            />
          </OptionalEmailWrapper>
          <CenterElementWrapper>
            <NormalButton buttonType="submit">Continue</NormalButton>
          </CenterElementWrapper>
        </ViewBox>
      </form>
    </Wrapper>
  );
};

export default Step3;
