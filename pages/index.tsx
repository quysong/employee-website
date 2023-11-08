import type { NextPage } from "next";
import styled, { css, DefaultTheme } from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import { darkTheme } from "../components/themes/darkTheme";
import { defaultTheme } from "../components/themes/defaultTheme";
import { COMMON } from "../constants/common";
import { IPalette } from "../styled";

export type ButtonProps = {
  active?: boolean; // making this props optional
  variant: "contained" | "outlined";
  color: keyof Omit<DefaultTheme["palette"], "common">;
};

export const Button = styled.button<ButtonProps>`
  /* common properties for button  */
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 4px 8px;
  :hover {
    cursor: pointer;
  }
  /* button specific props with theme */
  ${({ variant = "contained", theme, color }) => {
    const _color = theme.palette[color] as IPalette;
    switch (variant) {
      case "outlined":
        return css`
          background-color: ${_color.contrastText};
          color: ${_color.main};
          border: 1px solid ${_color.main};
        `;
      case "contained":
      default: {
        return css`
          background-color: ${_color.main};
          color: ${_color.contrastText};
          border: none;
        `;
      }
    }
  }}
`;

const Home: NextPage = () => {
  const [, setTheme] = useLocalStorage(COMMON.THEME, defaultTheme);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setTheme(defaultTheme)}
        style={{ marginRight: 8 }}
      >
        Use Default Theme
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setTheme(darkTheme)}
      >
        Use Dark Theme
      </Button>
    </div>
  );
};
export default Home;
