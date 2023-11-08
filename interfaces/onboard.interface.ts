import { ParsedUrlQuery } from "querystring";
import { LegacyRef, ReactNode } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister
} from "react-hook-form";
import { IAppContext } from "./common.interface";

type transType = (
  key: string,
  options?:
    | {
      [key: string]: string;
      [key: number]: string;
    }
    | undefined
) => string;
export type Step1Props = {
  [x: string]: any;
  t: transType;
  formRef: any;
  onSubmitStep1: () => void;
  errors?: ErrorsType;
  onClickNumber?: (value: string, e?: React.MouseEvent<HTMLDivElement>) => void;
};

export type Step2Props = {
  [x: string]: any;
  onOpenCamera: (type: TypeImageCardId) => void;
  objectUrlImage: ObjectUrlImageType;
  t: transType;
  errors: FieldErrors<ValuesStep2Type>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (values: ValuesStep2Type) => void;
  register: UseFormRegister<any>;
};

export type Step3Props = {
  t: transType;
  errors: FieldErrors<ValuesStep3Type>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (values: ValuesStep3Type) => void;
  register: UseFormRegister<any>;
};

export type Step4Props = {
  formRef: Step4OtpRefType;
  setCurrentFocusInput?: (val: string) => void;
};

export type ActiveStepsType = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
};

export interface OnboardViewProps {
  bulletList: number[];
  indexSwipe: number;
  phoneNumber?: string | string[];
  setIndexSwipe: (indexSwipe: number) => void;
  t: transType;
  arraySteps: () => ReactNode[];
  query: ParsedUrlQuery;
  slides: ActiveStepsType;
}

export type ObjectUrlImageType = {
  frontUrl: string | null;
  backUrl: string | null;
};

export type TypeImageCardId = "frontUrl" | "backUrl";
export type Step4OtpRefType = LegacyRef<any> | undefined;

export type ErrorsType = {
  day: string | null;
  month: string | null;
  year: string | null;
  step1Error: string | null;
};

//step 1
export type ValuesStep1Type = {
  day: string;
  month: string;
  year: string;
};

//step 2
export type ValuesStep2Type = {
  cardId: string | any;
  images: string;
};

//step 3

export type ValuesStep3Type = {
  address: string | any;
  building: string | any;
  floor: string | any;
  email: string | any;
};
