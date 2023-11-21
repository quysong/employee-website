import NormalButton from "components/button/submit";
import HeaderContainer from "containers/layout/header.container";
import { RowCenter } from "views/onboard/onboard.style";
import { ViewBox } from "./checkout.style";

interface CheckoutProps {
  onSubmit: any;
  handleSubmit: any;
  errors: any;
  [x: string]: any;
}
const CheckoutView: React.FC<CheckoutProps> = ({
  handleSubmit,
  onSubmit,
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
          <NormalButton buttonType="submit">Checkout</NormalButton>
        </RowCenter>
      </form>
    </ViewBox>
  );
};

export default CheckoutView;
