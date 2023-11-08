export interface KeyPairValue {
  [key: string]: string;
}

export interface IAppContext {
  onboard?: any; // onboard flow
  leaveRequest?: any; // leave request flow
  userInfo?: UserInfo; // common data for current user that interacting (Eg: phone number...)
  sessionId?: string;
}

export interface UserInfo {
  phoneNumber: string;
}

export interface SelectBoxTypes {
  key: number,
  value: string,
  hidden?: boolean,
  selected?: boolean,
  disable?: boolean,
}
