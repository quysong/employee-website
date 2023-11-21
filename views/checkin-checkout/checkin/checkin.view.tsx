import NormalButton from "components/button/submit";
import HeaderContainer from "containers/layout/header.container";
import { RowCenter } from "views/onboard/onboard.style";
import { ViewBox } from "./checkin.style";

interface CheckinProps {
  onSubmit: any;
  handleSubmit: any;
  errors: any;
  [x: string]: any;
}
const CheckinView: React.FC<CheckinProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
}) => {
  return (
    <ViewBox>
      <HeaderContainer />
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <RowCenter
          style={{
            marginTop: 18,
          }}
        >
          <NormalButton buttonType="submit">Check In/Out</NormalButton>
        </RowCenter>
      </form>
    </ViewBox>
  );
};

export default CheckinView;
