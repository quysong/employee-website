import dayjs from "dayjs";

export function isDateValid(date: string, format: string = "YYYY/MM/DD") {
  return dayjs(date, format).format(format) === date;
}

type CheckDateType = {
  error: string | null;
  status: boolean;
};
export const handleCheckDate = (
  type: "day" | "month" | "year",
  value: string
): CheckDateType => {
  let result: CheckDateType = {
    error: null,
    status: true,
  };
  if (['day', 'month'].includes(type)) {
    value = value?.length === 1 ? `0${value}` : value;
  }

  if (!value || value.length < 2) {
    return {
      error: `Please enter ${type}`,
      status: false,
    };
  }


  switch (type) {
    case "day":
      if (1 > parseInt(value) || parseInt(value) > 31) {
        result = {
          error: "Days should not exceed 30",
          status: false,
        };
      }
      break;
    case "month":
      if (1 > parseInt(value) || parseInt(value) > 12) {
        result = {
          error: "Month should not exceed 12",
          status: false,
        };
      }
      break;
    case "year":
      const now = new Date();
      if (value.length < 4) {
        result = {
          error: "Year must have 4 characters",
          status: false,
        };
      }
      if (parseInt(value) > now.getFullYear()) {
        result = {
          error: "Year must be less than current year",
          status: false,
        };
      }
      break;
    default:
      break;
  }
  return result;
};

export const formatDateYMD = (day: string, month: string, year: string) => {
  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;
  return `${year}/${month}/${day}`;
}

export const formatDateDMY = (day: string, month: string, year: string) => {
  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;
  return `${day}/${month}/${year}`;
}

export const getDifferenceBetween2Day = (dateTo: Date | any, dateFrom: Date | any) => {
  return Math.ceil(Math.abs(dateTo - dateFrom) / (1000 * 60 * 60 * 24)) + 1;
}

export const parseStringToDateWithFormat = (dateString: string) => {
  return dayjs(dateString).format('DD/MM/YYYY');

}