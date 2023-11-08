import { LayoutStyled } from "./layout.style";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutStyled>{children}</LayoutStyled>;
};

export default Layout;
