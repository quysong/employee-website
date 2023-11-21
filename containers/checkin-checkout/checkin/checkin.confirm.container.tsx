import Loading from "components/loading";
import BasicModal from "components/modal";
import ToastContainer from "containers/toast/toast.container";
import { NotificationType } from "interfaces/notification.interface";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import CheckinConfirmView from "../../../views/checkin-checkout/checkin/checkin.confirm.view";

interface CheckinContainer {}
const CheckinConfirmContainer = (props: CheckinContainer) => {
  const { push, query, asPath } = useRouter();

  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>({
    text: null,
    type: null,
  });

  useEffect(() => {}, []);

  return (
    <Suspense fallback={<Loading />}>
      {isShowLoading && (
        <BasicModal>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loading />
          </div>
        </BasicModal>
      )}
      <ToastContainer
        notification={notification}
        setNotification={setNotification}
      />
      <CheckinConfirmView location={query} />
    </Suspense>
  );
};

export default CheckinConfirmContainer;
