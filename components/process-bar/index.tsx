import Icon from "components/Icon";
import React from "react";
import {
  Bullet,
  BulletLine,
  BulletLineContainer,
  ContainerBullet,
  PictureBackIcon
} from "./process-bar.style";

interface ProcessBarProps {
  bulletList: any[];
  indexSwipe: number;
  setIndexSwipe?: (indexSwiper: number) => void;
}

const ProcessBar = ({
  bulletList,
  indexSwipe,
  setIndexSwipe,
}: ProcessBarProps) => {
  return (
    <ContainerBullet>
      {indexSwipe > 0 ? (
        <PictureBackIcon
          onClick={() => setIndexSwipe && setIndexSwipe(indexSwipe - 1)}
        >
          <Icon name="back-icon" alt="back icon" />
        </PictureBackIcon>
      ) : undefined}
      {bulletList.map((ele, index) => {
        return (
          <React.Fragment key={index}>
            <Bullet active={index === indexSwipe} skip={indexSwipe > index}>
              {indexSwipe > index ? (
                <svg
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6.375L4.09 9.73438L12.124 1"
                    stroke="#D817CA"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                ele
              )}
            </Bullet>
            {index + 1 < bulletList.length ? (
              <BulletLineContainer>
                <BulletLine></BulletLine>
              </BulletLineContainer>
            ) : (
              <></>
            )}
          </React.Fragment>
        );
      })}
    </ContainerBullet>
  );
};

export default ProcessBar;
