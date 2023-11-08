import { useRouter } from "next/router";

const useTrans = () => {
  const router = useRouter();
  const translationList: any = require(`public/lang/${router.locale}.json`);

  const t = (key: string, options?: { [key: string | number]: string }) => {
    let translatedValue: string =
      translationList && translationList[key] ? translationList[key] : key;

    if (options) {
      Object.keys(options).map((key) => {
        translatedValue = translatedValue.replace(`{${key}}`, options[key]);
      });
    }

    return translatedValue;
  };

  return {
    t,
  };
};

export default useTrans;
