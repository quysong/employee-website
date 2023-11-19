import { IAppContext } from "../interfaces/common.interface";

export const STORAGE_PREFIX = "zappy";

export const COMMON = {
  THEME: "theme",
  APP_STORAGE: `${STORAGE_PREFIX}_app`,
};

export const INIT_STORAGE: IAppContext = {
  onboard: {} as any,
  leaveRequest: {} as any,
  userInfo: {
    phoneNumber: "",
  },
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const zappyEndpoint =
  process.env.ZAPPY_END_POINT || "https://0b46-54-169-119-168.ngrok-free.app";

export const ANNUAL_LEAVE_NAME = "Annual Leave";
export const CASUAL_LEAVE_NAME = "Casual Leave";

export const LEAVE_REQUEST_TYPE = {
  confirm: "pending",
  refuse: "declined",
  validate: "approved",
};
