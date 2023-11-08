import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import Header from "components/header";

interface HeaderContainer {}
const HeaderContainer = (props: HeaderContainer) => {
  const { push, locale } = useRouter();
  const [lang, setLang] = useState<string>(locale ?? "");

  const changeLang = (_event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = _event.target;
    setLang(value);
    push("", "", { locale: value });
  };

  return <Header changeLang={changeLang} lang={lang} />;
};

export default HeaderContainer;
