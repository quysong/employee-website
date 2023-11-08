import Icon from "components/Icon";
import { ChangeEvent } from "react";
import { ContainerBox, SelectLang } from "./header.style";

interface HeaderProps {
  changeLang: (event: ChangeEvent<HTMLSelectElement>) => void;
  lang: string;
}

const Header = ({ changeLang, lang }: HeaderProps) => {
  return (
    <ContainerBox>
      <Icon name="logo" alt="logo Van!" />
      <SelectLang value={lang} onChange={changeLang}>
        <option value="en">English</option>
        {/* <option value="vi">Việt Nam</option> */}
      </SelectLang>
    </ContainerBox>
  );
};

export default Header;
