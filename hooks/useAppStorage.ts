import { useSessionStorage } from "usehooks-ts";
import { COMMON, INIT_STORAGE } from "../constants/common";
import { deepCopy } from "../helpers/common";
import { IAppContext } from "../interfaces/common.interface";

const useAppStorage = () => {
  const [appStorage, setAppStorage] = useSessionStorage(
    COMMON.APP_STORAGE,
    INIT_STORAGE
  );

  const setStorage = (data: IAppContext) => {
    let updatedData = data;
    try {
      const current = appStorage;
      if (current) {
        updatedData = {
          ...deepCopy(current),
          ...data,
        };
      }
    } catch (error) {
      console.log("error", error);
    }
    setAppStorage(updatedData);
  };

  return { appStorage, setStorage };
};

export default useAppStorage;
