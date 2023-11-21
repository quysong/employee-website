import HeaderContainer from "containers/layout/header.container";
import dynamic from "next/dynamic";
import { RowCenter } from "views/onboard/onboard.style";
import { Title, ViewBox } from "./checkin.style";

interface CheckinConfirmProps {
  location: any;
}

const CheckinConfirmView: React.FC<CheckinConfirmProps> = ({ location }) => {
  const Map = dynamic(
    () => import("components/map"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  return (
    <ViewBox>
      <HeaderContainer />
      <RowCenter>
        <Title>Check In/Out Confirmed</Title>
      </RowCenter>
      <RowCenter>
        <Map
          center={[
            parseFloat(location["latitude"]),
            parseFloat(location["longitude"]),
          ]}
        />
      </RowCenter>
    </ViewBox>
  );
};

export default CheckinConfirmView;
