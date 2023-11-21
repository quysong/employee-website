export const deepCopy = (obj: any, hash = new WeakMap()) => {
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    if (obj[key] && typeof obj[key] === "object") {
      cloneObj[key] = deepCopy(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};

export const formatNationalId = (txt: string) => {
  return Array.from(txt)
    .map((item: string, index: number) =>
      [2, 4, 6].includes(index) ? `${item} ` : item
    )
    .join("");
};

export const removeHeadBase64 = (base64: string) => {
  return base64.replace("data:image/png;base64,", "");
};

export const formatPhoneFromUrl = (phone_number: string) => {
  return `+${phone_number?.toString().trim().replace("+", "")}`;
};

export const cleanObject = (obj: any) => {
  let result: any = {};
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if ((!Array.isArray(obj[key]) && obj[key]) || obj[key]?.length)
        result[key] = obj[key];
    });
  }
  return result;
};

export const getQueryParam = (paramName: string) => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const valueByQueryName = urlParams.get(paramName);
    return valueByQueryName;
  } catch (error) {
    return "";
  }
};
