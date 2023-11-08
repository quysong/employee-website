// import React from "react";
import { ContainerCard } from "./card.style";

interface NormalCardProps {
  children: React.ReactNode | string;
  bgColor?: string;
  styles?: string;
  isError?: boolean;
}

const NormalCard = ({
  children,
  bgColor,
  styles,
  isError,
}: NormalCardProps) => {
  return (
    <ContainerCard bgColor={bgColor} styles={styles} isError={isError}>
      {children}
    </ContainerCard>
  );
};

export default NormalCard;
